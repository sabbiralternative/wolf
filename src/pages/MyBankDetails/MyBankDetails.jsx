/* eslint-disable react/no-unknown-property */
import { useEffect, useState } from "react";
import AddBank from "../../components/modal/AddBank";
import Warning from "../../components/modal/Warning";
import { IoMdArrowDropdown, IoMdArrowDropright } from "react-icons/io";
import { API } from "../../api";
import { handleVisibleBankDetails } from "../../utils/handleVisibleBankDetails";
import Success from "../../components/ui/Notification/Success";
import useGetBankAccountName from "../../hooks/BankAccount/useGetBankAccountName";
import { AxiosSecure } from "../../lib/AxiosSecure";
import AddUSDTAccount from "../../components/modal/AddUSDTAccount";

const MyBankDetails = () => {
  const [showAddBank, setShowAddBank] = useState(false);
  const [showUSDTModal, setShowUSDTModal] = useState(false);
  const [showDefaultWarning, setShowDefaultWarning] = useState(false);
  const [bankId, setBankId] = useState("");
  const [successCrudMgs, setSuccessCrudMsg] = useState("");
  const [errCrudMsg, setErrCrudMsg] = useState("");
  const [showDeleteWarning, setShowDeleteWarning] = useState(false);
  const [activeTab, setActiveTab] = useState(1);
  const bankDataPostBody = {
    type: "getBankAccounts",
    status: activeTab,
  };
  const { bankData, refetchBankData } = useGetBankAccountName(bankDataPostBody);
  const handleBankCrud = async (type, setShowWarning) => {
    const bankData = {
      type,
      bankId,
    };

    const res = await AxiosSecure.post(API.bankAccount, bankData);
    const data = res?.data;
    if (data?.success) {
      setSuccessCrudMsg(data?.result?.message);
      refetchBankData();
      setShowWarning(false);
    } else {
      setErrCrudMsg(data?.error?.errorMessage);
      refetchBankData();
      setShowWarning(false);
    }
  };

  useEffect(() => {
    refetchBankData();
  }, [refetchBankData, activeTab]);

  return (
    <>
      {/* Move to default account start */}
      {showDefaultWarning && (
        <Warning
          buttonInnerText="Ok, Set"
          description="  Are you sure you want to set this default bank?"
          title="Default bank"
          handleSubmit={() =>
            handleBankCrud("defaultBank", setShowDefaultWarning)
          }
          setShowWarning={setShowDefaultWarning}
        />
      )}

      {successCrudMgs && (
        <Success
          message={successCrudMgs}
          setMessage={setSuccessCrudMsg}
          success={true}
        />
      )}
      {errCrudMsg && (
        <Success
          message={errCrudMsg}
          setMessage={setErrCrudMsg}
          success={false}
        />
      )}
      {/* Move to default account start */}

      {/* Delete bank start */}
      {showDeleteWarning && (
        <Warning
          buttonInnerText="Yes, Delete"
          description="Are you sure you want to delete this bank?"
          handleSubmit={() =>
            handleBankCrud("deleteBankAccount", setShowDeleteWarning)
          }
          setShowWarning={setShowDeleteWarning}
          title="Delete Bank"
        />
      )}
      {/* Delete bank end */}

      <div
        _ngcontent-ng-c3542240159=""
        className="page-body"
        style={{ minHeight: "100vh" }}
      >
        <div
          _ngcontent-ng-c3542240159=""
          className="hydrated"
          //   style="--offset-top: 0px; --offset-bottom: 0px;"
        >
          <div
            _ngcontent-ng-c3542240159=""
            slot="fixed"
            className="refresher refresher-md hydrated"
          >
            <div _ngcontent-ng-c3542240159="" className="hydrated">
              <div className="refresher-pulling">
                <div className="refresher-pulling-icon">
                  <span
                    role="img"
                    className="hydrated"
                    aria-label="arrow down"
                  ></span>
                </div>
              </div>
              <div className="refresher-refreshing">
                <div className="refresher-refreshing-icon">
                  <span className="spinner-lines hydrated"></span>
                </div>
              </div>
            </div>
          </div>
          <div _ngcontent-ng-c3542240159="" className="banking-page-wrap">
            <div
              _ngcontent-ng-c3542240159=""
              ngskiphydration=""
              animationduration="0ms"
              className="mat-mdc-tab-group banking-tabs-group mat-primary mat-mdc-tab-group-stretch-tabs"
              //   style="--mat-tab-animation-duration: 0ms;"
            >
              <div className="mat-mdc-tab-header mat-tab-header">
                <button
                  aria-hidden="true"
                  type="button"
                  mat-ripple=""
                  className="mat-ripple mat-mdc-tab-header-pagination mat-mdc-tab-header-pagination-before mat-mdc-tab-header-pagination-disabled"
                  disabled=""
                >
                  <div className="mat-mdc-tab-header-pagination-chevron"></div>
                </button>
                <div className="mat-mdc-tab-label-container">
                  <div
                    role="tablist"
                    className="mat-mdc-tab-list"
                    style={{ transform: "translateX(0px)" }}
                  >
                    <div className="mat-mdc-tab-labels">
                      <div
                        onClick={() => setActiveTab(1)}
                        role="tab"
                        mattablabelwrapper=""
                        cdkmonitorelementfocus=""
                        className={`mdc-tab mat-mdc-tab mat-mdc-focus-indicator mdc-tab--active ng-star-inserted ${
                          activeTab === 1 ? "mdc-tab-indicator--active" : ""
                        }`}
                        id="mat-tab-label-0-0"
                        aria-posinset="1"
                        aria-setsize="3"
                        aria-controls="mat-tab-content-0-0"
                        aria-selected="true"
                        aria-disabled="false"
                      >
                        <span className="mdc-tab__ripple"></span>
                        <div
                          mat-ripple=""
                          className="mat-ripple mat-mdc-tab-ripple"
                        ></div>
                        <span className="mdc-tab__content">
                          <span className="mdc-tab__text-label">
                            Active Banks
                          </span>
                        </span>
                        <span className="mdc-tab-indicator">
                          <span className="mdc-tab-indicator__content mdc-tab-indicator__content--underline"></span>
                        </span>
                      </div>
                      <div
                        onClick={() => setActiveTab(0)}
                        role="tab"
                        mattablabelwrapper=""
                        cdkmonitorelementfocus=""
                        className={`mdc-tab mat-mdc-tab mat-mdc-focus-indicator ng-star-inserted ${
                          activeTab === 0 ? "mdc-tab-indicator--active" : ""
                        }`}
                        id="mat-tab-label-0-1"
                        aria-posinset="2"
                        aria-setsize="3"
                        aria-controls="mat-tab-content-0-1"
                        aria-selected="false"
                        aria-disabled="false"
                      >
                        <span className="mdc-tab__ripple"></span>
                        <div
                          mat-ripple=""
                          className="mat-ripple mat-mdc-tab-ripple"
                        ></div>
                        <span className="mdc-tab__content">
                          <span className="mdc-tab__text-label">Deleted</span>
                        </span>
                        <span className="mdc-tab-indicator">
                          <span className="mdc-tab-indicator__content mdc-tab-indicator__content--underline"></span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <button
                  aria-hidden="true"
                  type="button"
                  mat-ripple=""
                  className="mat-ripple mat-mdc-tab-header-pagination mat-mdc-tab-header-pagination-after mat-mdc-tab-header-pagination-disabled"
                  disabled=""
                >
                  <div className="mat-mdc-tab-header-pagination-chevron"></div>
                </button>
              </div>
              <div className="mat-mdc-tab-body-wrapper">
                <div
                  role="tabpanel"
                  className="mat-mdc-tab-body ng-tns-c737557735-1 mat-mdc-tab-body-active ng-star-inserted"
                  id="mat-tab-content-0-0"
                  aria-labelledby="mat-tab-label-0-0"
                >
                  <div
                    cdkscrollable=""
                    className="mat-mdc-tab-body-content ng-tns-c737557735-1 ng-trigger ng-trigger-translateTab"
                    style={{ transform: "none" }}
                  >
                    <div
                      _ngcontent-ng-c3542240159=""
                      className="action-btn ng-star-inserted"
                    >
                      <button
                        onClick={() => setShowAddBank(true)}
                        _ngcontent-ng-c3542240159=""
                        type="button"
                        className="btn secondary-btn"
                      >
                        Add New Bank
                      </button>
                      <button
                        style={{ marginTop: "5px" }}
                        onClick={() => setShowUSDTModal(true)}
                        _ngcontent-ng-c3542240159=""
                        type="button"
                        className="btn secondary-btn"
                      >
                        Add USDT Account
                      </button>
                    </div>
                    {bankData?.length > 0 && (
                      <div
                        _ngcontent-ng-c3542240159=""
                        className="title-bar ng-star-inserted"
                      >
                        <h2 _ngcontent-ng-c3542240159="" className="title">
                          Bank Details
                        </h2>
                      </div>
                    )}

                    <div
                      _ngcontent-ng-c3542240159=""
                      className="banks-list-wrap ng-star-inserted"
                    >
                      {Array.isArray(bankData) && bankData?.length > 0 ? (
                        bankData?.map((data, i) => {
                          return (
                            <div
                              key={i}
                              _ngcontent-ng-c3542240159=""
                              className="mat-accordion ng-star-inserted"
                            >
                              <div
                                _ngcontent-ng-c3542240159=""
                                hidetoggle=""
                                className="mat-expansion-panel mat-exp-bank-item ng-tns-c1859850774-4 ng-star-inserted mat-expanded mat-expansion-panel-spacing"
                              >
                                <div
                                  _ngcontent-ng-c3542240159=""
                                  role="button"
                                  className="mat-expansion-panel-header mat-focus-indicator ng-tns-c2690051721-5 ng-tns-c1859850774-4 mat-expansion-toggle-indicator-after ng-star-inserted mat-expanded"
                                  id="mat-expansion-panel-header-0"
                                  aria-controls="cdk-accordion-child-0"
                                  aria-expanded="true"
                                  aria-disabled="false"
                                >
                                  <span className="mat-content ng-tns-c2690051721-5 mat-content-hide-toggle">
                                    <div
                                      onClick={() =>
                                        handleVisibleBankDetails(
                                          data?.bankId,
                                          bankId,
                                          setBankId
                                        )
                                      }
                                      _ngcontent-ng-c3542240159=""
                                      className="mat-expansion-panel-header-title ng-tns-c2690051721-5"
                                    >
                                      {/* <div
                                        _ngcontent-ng-c3542240159=""
                                        className="img-wrap"
                                      >
                                        <img
                                          _ngcontent-ng-c3542240159=""
                                          alt="Bank Icon"
                                          src={`/assets/img/${data?.bankCode}.png`}
                                        />
                                      </div> */}
                                      <h2 _ngcontent-ng-c3542240159="">
                                        {data?.bankName}
                                        {data?.isDefault === 1 && (
                                          <span
                                            _ngcontent-ng-c3542240159=""
                                            className="preffered ng-star-inserted"
                                          >
                                            Default
                                          </span>
                                        )}
                                      </h2>
                                    </div>
                                    <div
                                      _ngcontent-ng-c3542240159=""
                                      className="mat-expansion-panel-header-description ng-tns-c2690051721-5"
                                    >
                                      {activeTab === 1 && (
                                        <span
                                          onClick={() => {
                                            setShowDeleteWarning(true);
                                            setBankId(data?.bankId);
                                          }}
                                          _ngcontent-ng-c3542240159=""
                                          role="img"
                                          className="mat-icon notranslate material-symbols delete-icon material-icons mat-ligature-font mat-icon-no-color ng-star-inserted"
                                          aria-hidden="true"
                                          data-mat-icon-type="font"
                                        >
                                          delete
                                        </span>
                                      )}
                                      <span
                                        onClick={() =>
                                          handleVisibleBankDetails(
                                            data?.bankId,
                                            bankId,
                                            setBankId
                                          )
                                        }
                                        _ngcontent-ng-c3542240159=""
                                        role="img"
                                        className="mat-icon notranslate material-icons mat-ligature-font mat-icon-no-color ng-star-inserted"
                                        aria-hidden="true"
                                        data-mat-icon-type="font"
                                      >
                                        {bankId ? (
                                          <IoMdArrowDropdown />
                                        ) : (
                                          <IoMdArrowDropright />
                                        )}
                                      </span>
                                    </div>
                                  </span>
                                </div>
                                <div
                                  role="region"
                                  className={`mat-expansion-panel-content ng-tns-c1859850774-4 ng-trigger ng-trigger-bodyExpansion ${
                                    bankId === data?.bankId
                                      ? ""
                                      : "invisibleBankDEtails"
                                  }`}
                                  id="cdk-accordion-child-0"
                                  aria-labelledby="mat-expansion-panel-header-0"
                                >
                                  {/* <!-- style="height: 0px; visibility: hidden;" --> */}
                                  <div className="mat-expansion-panel-body ng-tns-c1859850774-4">
                                    <div
                                      _ngcontent-ng-c3542240159=""
                                      className="banks-details ng-tns-c1859850774-4"
                                    >
                                      <ul _ngcontent-ng-c3542240159="">
                                        <li _ngcontent-ng-c3542240159="">
                                          <label _ngcontent-ng-c3542240159="">
                                            Account holder name
                                          </label>
                                          <p _ngcontent-ng-c3542240159="">
                                            {data?.bankAccountName}
                                          </p>
                                        </li>
                                        <li _ngcontent-ng-c3542240159="">
                                          <label _ngcontent-ng-c3542240159="">
                                            Account number
                                          </label>
                                          <p _ngcontent-ng-c3542240159="">
                                            {data?.accountNumber}
                                          </p>
                                        </li>
                                        <li _ngcontent-ng-c3542240159="">
                                          <label _ngcontent-ng-c3542240159="">
                                            IFSC Code
                                          </label>
                                          <p _ngcontent-ng-c3542240159="">
                                            {data?.ifsc}
                                          </p>
                                        </li>
                                        <li _ngcontent-ng-c3542240159="">
                                          <label _ngcontent-ng-c3542240159="">
                                            Bank Branch
                                          </label>
                                          <p _ngcontent-ng-c3542240159="">
                                            {data?.bankBranch}
                                          </p>
                                        </li>
                                        <li _ngcontent-ng-c3542240159="">
                                          <label _ngcontent-ng-c3542240159="">
                                            Account added on
                                          </label>
                                          <p _ngcontent-ng-c3542240159="">
                                            {data?.dateAdded}
                                          </p>
                                        </li>
                                      </ul>
                                      {data?.isDefault === 0 &&
                                        activeTab === 1 && (
                                          <div
                                            _ngcontent-ng-c3542240159=""
                                            className="action-btn ng-star-inserted"
                                          >
                                            <button
                                              onClick={() =>
                                                setShowDefaultWarning(true)
                                              }
                                              _ngcontent-ng-c3542240159=""
                                              type="button"
                                              className="btn secondary-btn"
                                            >
                                              Default
                                            </button>
                                          </div>
                                        )}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })
                      ) : (
                        <div
                          class=" ng-star-inserted"
                          style={{
                            fontWeight: "300",
                            fontSize: "10px",
                            opacity: ".6",
                            marginTop: "10px",
                            padding: "0 5px",
                          }}
                        >
                          <p _ngcontent-ng-c3542240159="">
                            No Bank Details found! Adding Bank Details is
                            mandatory for processing withdrawals
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                {/* <div
                  role="tabpanel"
                  className="mat-mdc-tab-body ng-tns-c737557735-2 ng-star-inserted"
                  id="mat-tab-content-0-1"
                  aria-labelledby="mat-tab-label-0-1"
                >
                  <div
                    cdkscrollable=""
                    className="mat-mdc-tab-body-content ng-tns-c737557735-2 ng-trigger ng-trigger-translateTab"
                    style={{
                      transform: "translate3d(100%, 0px, 0px)",
                      minHeight: "1px",
                      visibility: "hidden",
                    }}
                  ></div>
                </div>
                <div
                  role="tabpanel"
                  className="mat-mdc-tab-body ng-tns-c737557735-3 ng-star-inserted"
                  id="mat-tab-content-0-2"
                  aria-labelledby="mat-tab-label-0-2"
                >
                  <div
                    cdkscrollable=""
                    className="mat-mdc-tab-body-content ng-tns-c737557735-3 ng-trigger ng-trigger-translateTab"
                    style={{
                      transform: "translate3d(100%, 0px, 0px)",
                      minHeight: "1px",
                      visibility: "hidden",
                    }}
                  ></div>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
      {showAddBank && (
        <AddBank
          setShowAddBank={setShowAddBank}
          refetchBankData={refetchBankData}
          setErrCrudMsg={setErrCrudMsg}
          setSuccessCrudMsg={setSuccessCrudMsg}
        />
      )}
      {showUSDTModal && (
        <AddUSDTAccount
          setShowUSDTModal={setShowUSDTModal}
          refetchBankData={refetchBankData}
          setErrCrudMsg={setErrCrudMsg}
          setSuccessCrudMsg={setSuccessCrudMsg}
        />
      )}
    </>
  );
};

export default MyBankDetails;
