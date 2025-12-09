/* eslint-disable react/no-unknown-property */
import { useState } from "react";
import { useIndex } from "../../../hooks";
import moment from "moment";

const ProfitLoss = () => {
  const from = new Date(new Date().setDate(new Date().getDate() - 7))
    .toISOString()
    .split("T")[0];
  const to = new Date().toISOString().split("T")[0];
  const [fromDate, setFromDate] = useState(from);
  const [toDate, setToDate] = useState(to);
  const { mutate, data, isSuccess } = useIndex();

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate({
      type: "get_affiliate_all_pl",
      from_date: fromDate,
      to_date: toDate,
    });
  };

  const getUniqueDate = Array.from(
    new Set(data?.result?.map((item) => item?.date_added))
  );
  return (
    <section data-v-81c2ddd8 className="nw-affi-user-wrapper affi-pd-bot">
      <div data-v-81c2ddd8 className>
        <h3 data-v-81c2ddd8 className="nw-affi-heading-text">
          User Profit / Loss
        </h3>
        <form
          onSubmit={handleSubmit}
          data-v-81c2ddd8
          className="typeslabel openbettss affiliate-pl affiliate-report affi-date-filter-form"
        >
          <ul
            style={{ paddingLeft: "0px" }}
            data-v-81c2ddd8
            className="typelabel-main flex-nowrap"
          >
            <li style={{ listStyle: "none" }} data-v-81c2ddd8>
              <div data-v-81c2ddd8 className="form-group">
                <label data-v-81c2ddd8 className="label-pl12">
                  From Date
                </label>
                <input
                  onChange={(e) => setFromDate(e.target.value)}
                  data-v-81c2ddd8
                  type="date"
                  id="open-bet-from"
                  className="form-control"
                  value={fromDate}
                />
              </div>
            </li>
            <li style={{ listStyle: "none" }} data-v-81c2ddd8>
              <div data-v-81c2ddd8 className="form-group">
                <label data-v-81c2ddd8 className="label-pl12">
                  To Date
                </label>
                <input
                  onChange={(e) => setToDate(e.target.value)}
                  data-v-81c2ddd8
                  type="date"
                  id="open-bet-from"
                  className="form-control"
                  value={toDate}
                />
              </div>
            </li>
          </ul>
          <div data-v-81c2ddd8 className="download-main">
            <button
              type="submit"
              className="nw-affi-add-new-user-btn"
              data-bs-target="#AfAddNewUser"
              data-bs-toggle="modal"
              data-v-4c49d924
            >
              <span data-v-4c49d924>Submit</span>
            </button>
          </div>
        </form>
        <div
          _ngcontent-ng-c773751984=""
          className="mat-accordion bet-history-accordion ng-star-inserted"
        >
          {getUniqueDate?.length > 0 && (
            <>
              {getUniqueDate?.map((date) => {
                const filterByDate = data?.result?.filter(
                  (item) => item?.date_added === date
                );
                const totalPnl = filterByDate?.reduce((acc, curr) => {
                  return acc + Number(curr.amount);
                }, 0);
                return (
                  <div key={date} style={{ marginBottom: "10px" }}>
                    <div
                      style={{
                        margin: "3px 0px",
                        color: "white",
                        borderRadius: "10px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: "9px 10px",
                        backgroundColor: "var(--primary-color)",
                      }}
                    >
                      <div
                        style={{
                          fontSize: "11px",

                          lineHeight: "140%",
                        }}
                      >
                        {moment(date).format("Do-MMM-YYYY")}
                      </div>
                      <div
                        style={{
                          fontSize: "11px",

                          lineHeight: "140%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <span>Total PL</span>
                        <span
                          style={{
                            marginTop: "-2px",
                            marginLeft: "4px",
                          }}
                        >
                          :
                        </span>
                        <span
                          style={{
                            marginLeft: "4px",
                            textShadow: "1px 1px #000000",
                            color:
                              totalPnl > 0
                                ? "#48BB78"
                                : totalPnl < 0
                                ? "#F56565"
                                : "#FFFFFF",
                          }}
                        >
                          {totalPnl}
                        </span>
                      </div>
                    </div>

                    {data?.result?.map((item, i) => {
                      return (
                        <div
                          style={{ margin: "3px 0px", maxWidth: "100%" }}
                          key={i}
                          _ngcontent-ng-c773751984=""
                          hidetoggle="true"
                          className="mat-expansion-panel ng-tns-c1859850774-77 ng-star-inserted mat-expanded mat-expansion-panel-spacing"
                        >
                          <div
                            _ngcontent-ng-c773751984=""
                            role="button"
                            className="mat-expansion-panel-header mat-focus-indicator ng-tns-c2690051721-78 ng-tns-c1859850774-77 mat-expansion-toggle-indicator-after ng-star-inserted mat-expanded"
                            id="mat-expansion-panel-header-8"
                            aria-controls="cdk-accordion-child-8"
                            aria-expanded="true"
                            aria-disabled="false"
                          >
                            <span className="mat-content ng-tns-c2690051721-78 mat-content-hide-toggle">
                              <div
                                _ngcontent-ng-c773751984=""
                                className="mat-expansion-panel-header-title ng-tns-c2690051721-78"
                              >
                                <h3 _ngcontent-ng-c773751984="">
                                  {item?.event_type_id}
                                </h3>
                              </div>
                              <div
                                _ngcontent-ng-c773751984=""
                                className="mat-expansion-panel-header-description ng-tns-c2690051721-78"
                              >
                                <span
                                  _ngcontent-ng-c773751984=""
                                  className={`${
                                    item?.amount > 0 ? "Won" : "Lost"
                                  }`}
                                >
                                  {item?.amount}
                                </span>
                              </div>
                            </span>
                          </div>
                          <div
                            role="region"
                            className="mat-expansion-panel-content ng-tns-c1859850774-77 ng-trigger ng-trigger-bodyExpansion"
                            id="cdk-accordion-child-8"
                            aria-labelledby="mat-expansion-panel-header-8"
                          ></div>
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </>
          )}

          {isSuccess && getUniqueDate?.length === 0 && (
            <div
              _ngcontent-ng-c2482505616=""
              className="no-data ng-star-inserted"
            >
              <p _ngcontent-ng-c2482505616="">No passbook entries available</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProfitLoss;
