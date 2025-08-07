/* eslint-disable react/no-unknown-property */
import { useState } from "react";
import useWithdrawStatement from "../../hooks/useWithdrawStatement";
import ViewImage from "../../components/modal/ViewImage";
import Complaint from "../../components/modal/Complaint";
import { Settings } from "../../api";

const WithdrawStatement = () => {
  const [complaintId, setComplaintId] = useState(null);
  const [image, setImage] = useState(null);
  const { withdrawStatement } = useWithdrawStatement();

  return (
    <>
      {complaintId && (
        <Complaint
          setComplaintId={setComplaintId}
          complaintId={complaintId}
          method="withdraw"
        />
      )}
      {image && <ViewImage image={image} setImage={setImage} />}
      <div
        _ngcontent-ng-c3622565476=""
        className="page-body"
        style={{ minHeight: "100vh" }}
      >
        <div _ngcontent-ng-c3622565476="" className="passbook-page-wrap">
          <div
            _ngcontent-ng-c3622565476=""
            ngskiphydration=""
            animationduration="0ms"
            className="mat-mdc-tab-group passbook-tabs-group mat-tab-group mat-primary mat-mdc-tab-group-stretch-tabs"
            //   style="--mat-tab-animation-duration: 0ms;"
          >
            <div className="mat-mdc-tab-body-wrapper">
              <div
                role="tabpanel"
                className="mat-mdc-tab-body mat-tab-body ng-tns-c737557735-10 ng-star-inserted mat-mdc-tab-body-active"
                id="mat-tab-content-1-0"
                aria-labelledby="mat-tab-label-1-0"
              >
                <div
                  cdkscrollable=""
                  className="mat-mdc-tab-body-content ng-tns-c737557735-10 ng-trigger ng-trigger-translateTab"
                  style={{ transform: "none" }}
                >
                  <div
                    _ngcontent-ng-c3622565476=""
                    _nghost-ng-c2945624842=""
                    className="ng-star-inserted"
                  >
                    <div
                      _ngcontent-ng-c2945624842=""
                      className="hydrated"
                      // style="--offset-top: 0px; --offset-bottom: 0px;"
                    >
                      <div
                        _ngcontent-ng-c2945624842=""
                        infinitescroll=""
                        className="transactions-wrap"
                      >
                        <div _ngcontent-ng-c2945624842="" className="title">
                          <h2 _ngcontent-ng-c2945624842="">Transactions</h2>
                        </div>
                        {withdrawStatement?.map((withdraw, i) => {
                          return (
                            <div
                              key={i}
                              _ngcontent-ng-c2945624842=""
                              className="transaction-item ng-star-inserted"
                            >
                              <div
                                _ngcontent-ng-c2945624842=""
                                className="wrapper"
                              >
                                <ul _ngcontent-ng-c2945624842="">
                                  <li _ngcontent-ng-c2945624842="">
                                    <p
                                      _ngcontent-ng-c2945624842=""
                                      className="txn-type"
                                    >
                                      {" "}
                                      Withdraw{" "}
                                      <span _ngcontent-ng-c2945624842="">
                                        {withdraw?.date}
                                      </span>
                                    </p>
                                    {withdraw?.image && (
                                      <p
                                        onClick={() =>
                                          setImage(withdraw?.image)
                                        }
                                        style={{
                                          height: "100%",
                                          margin: "0px",
                                        }}
                                      >
                                        <img
                                          style={{
                                            width: "30px",
                                            height: "100%",
                                          }}
                                          src={withdraw?.image}
                                          alt=""
                                        />
                                      </p>
                                    )}

                                    <p
                                      _ngcontent-ng-c2945624842=""
                                      className="amount"
                                    >
                                      <span
                                        _ngcontent-ng-c2945624842=""
                                        className="coins"
                                      >
                                        {withdraw?.amount}
                                      </span>
                                      <span
                                        _ngcontent-ng-c2945624842=""
                                        className={` status
                             ${
                               withdraw?.status === "REJECTED" ? "Rejected" : ""
                             }
                             ${
                               withdraw?.status === "APPROVED" ? "Approved" : ""
                             }
                             ${withdraw?.status === "PENDING" ? "pending" : ""}
                             
                             `}
                                      >
                                        {withdraw?.status}
                                      </span>
                                      {Settings.complaint && (
                                        <button
                                          style={{
                                            backgroundColor: "rgb(255 131 46)",
                                            borderRadius: "5px",
                                            fontSize: "12px",
                                            border: "none",
                                            color: "white",
                                            marginTop: "3px",
                                          }}
                                          onClick={() =>
                                            setComplaintId(
                                              withdraw?.referenceNo
                                            )
                                          }
                                          className="px-2 py-1  text-white   "
                                        >
                                          Raise Complaint
                                        </button>
                                      )}
                                    </p>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WithdrawStatement;
