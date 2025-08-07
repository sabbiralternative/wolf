import { useState } from "react";
import useDepositStatement from "../../hooks/useDepositStatement";
import AccountStatementModal from "../../components/modal/AccountStatementModal";
import { handleVisibleBankDetails } from "../../utils/handleVisibleBankDetails";
import { IoMdArrowDropdown, IoMdArrowDropright } from "react-icons/io";
import Complaint from "../../components/modal/Complaint";
import { Settings } from "../../api";

/* eslint-disable react/no-unknown-property */
const DepositStatement = () => {
  const [complaintId, setComplaintId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [image, setImage] = useState("");
  const [accordion, setAccordion] = useState("");
  /* get deposit data */
  const { accountStatement } = useDepositStatement();

  return (
    <>
      {complaintId && (
        <Complaint
          setComplaintId={setComplaintId}
          complaintId={complaintId}
          method="deposit"
        />
      )}
      <div
        _ngcontent-ng-c3622565476=""
        className="page-body"
        style={{ minHeight: "100vh" }}
      >
        {showModal && (
          <AccountStatementModal setShowModal={setShowModal} image={image} />
        )}
        <div _ngcontent-ng-c3622565476="" className="passbook-page-wrap">
          <div
            _ngcontent-ng-c3622565476=""
            ngskiphydration=""
            animationduration="0ms"
            className="mat-mdc-tab-group passbook-tabs-group mat-tab-group mat-primary mat-mdc-tab-group-stretch-tabs"
            // style="--mat-tab-animation-duration: 0ms;"
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
                      //   style="--offset-top: 0px; --offset-bottom: 0px;"
                    >
                      <div
                        _ngcontent-ng-c2945624842=""
                        infinitescroll=""
                        className="transactions-wrap"
                      >
                        <div _ngcontent-ng-c2945624842="" className="title">
                          <h2 _ngcontent-ng-c2945624842="">Transactions</h2>
                        </div>
                        {accountStatement?.length > 0 ? (
                          accountStatement?.map((data, i) => {
                            return (
                              <div
                                key={i}
                                _ngcontent-ng-c2945624842=""
                                className="transaction-item ng-star-inserted"
                              >
                                <div
                                  onClick={() =>
                                    handleVisibleBankDetails(
                                      i + 1,
                                      accordion,
                                      setAccordion
                                    )
                                  }
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
                                        Deposit{" "}
                                        <span _ngcontent-ng-c2945624842="">
                                          {data?.date}
                                        </span>
                                      </p>
                                      <p
                                        _ngcontent-ng-c2945624842=""
                                        className="amount"
                                      >
                                        <span
                                          _ngcontent-ng-c2945624842=""
                                          className="coins"
                                        >
                                          {data?.amount}
                                        </span>
                                        <span
                                          _ngcontent-ng-c2945624842=""
                                          className={`${
                                            data?.status === "APPROVED"
                                              ? "Approved status"
                                              : ""
                                          } ${
                                            data?.status === "REJECTED"
                                              ? "Rejected status"
                                              : ""
                                          } ${
                                            data?.status === "PENDING"
                                              ? "Pending status"
                                              : ""
                                          }`}
                                        >
                                          {data?.status}
                                        </span>
                                      </p>
                                    </li>
                                  </ul>
                                  <div
                                    style={{
                                      display: "flex",
                                      justifyContent: "space-between",
                                      marginTop: "4px",
                                    }}
                                  >
                                    <span
                                      _ngcontent-ng-c2945624842=""
                                      role="img"
                                      className="mat-icon notranslate material-icons mat-ligature-font mat-icon-no-color ng-star-inserted"
                                      aria-hidden="true"
                                      data-mat-icon-type="font"
                                    >
                                      {accordion ? (
                                        <IoMdArrowDropdown />
                                      ) : (
                                        <IoMdArrowDropright />
                                      )}
                                    </span>
                                    {Settings.complaint && (
                                      <button
                                        style={{
                                          backgroundColor: "rgb(255 131 46)",
                                          borderRadius: "5px",
                                          fontSize: "12px",
                                          border: "none",
                                          color: "white",
                                        }}
                                        onClick={() =>
                                          setComplaintId(data?.referenceNo)
                                        }
                                        className="px-2 py-1  text-white   "
                                      >
                                        Raise Complaint
                                      </button>
                                    )}
                                  </div>
                                </div>
                                <div
                                  /* hidden */
                                  _ngcontent-ng-c2945624842=""
                                  className={`txn-detail ng-star-inserted ${
                                    accordion == i + 1
                                      ? ""
                                      : "invisibleBankDEtails"
                                  }`}
                                >
                                  <div
                                    _ngcontent-ng-c2945624842=""
                                    className="txn-detail-header"
                                  >
                                    <p _ngcontent-ng-c2945624842="">
                                      <span _ngcontent-ng-c2945624842="">
                                        Reference no.
                                      </span>
                                      <span _ngcontent-ng-c2945624842="">
                                        {data?.referenceNo}
                                      </span>
                                    </p>
                                    <p
                                      _ngcontent-ng-c2945624842=""
                                      className="ng-star-inserted"
                                    >
                                      <span _ngcontent-ng-c2945624842="">
                                        Coins
                                      </span>
                                      <span _ngcontent-ng-c2945624842="">
                                        {data?.amount}
                                      </span>
                                    </p>
                                    <p
                                      _ngcontent-ng-c2945624842=""
                                      className="ng-star-inserted"
                                    >
                                      <span _ngcontent-ng-c2945624842="">
                                        Approved on
                                      </span>
                                      <span _ngcontent-ng-c2945624842="">
                                        {data?.date}
                                      </span>
                                    </p>
                                    {data?.remark && (
                                      <p
                                        _ngcontent-ng-c2945624842=""
                                        className="ng-star-inserted"
                                      >
                                        <span _ngcontent-ng-c2945624842="">
                                          Remark
                                        </span>
                                        <span _ngcontent-ng-c2945624842="">
                                          {data?.remark}
                                        </span>
                                      </p>
                                    )}
                                  </div>
                                  <div
                                    _ngcontent-ng-c2945624842=""
                                    className="txn-detail-body ng-star-inserted"
                                  >
                                    <div
                                      _ngcontent-ng-c2945624842=""
                                      className="txn-screenshot ng-star-inserted"
                                    >
                                      {data?.image && (
                                        <div
                                          _ngcontent-ng-c2945624842=""
                                          className="Approved img-wrap"
                                        >
                                          <img
                                            onClick={() => {
                                              setShowModal(true);
                                              setImage("");
                                              setImage(data?.image);
                                            }}
                                            _ngcontent-ng-c2945624842=""
                                            alt="Screenshot"
                                            src={data?.image}
                                          />
                                        </div>
                                      )}
                                      <p
                                        _ngcontent-ng-c2945624842=""
                                        className="status"
                                      >
                                        <span
                                          _ngcontent-ng-c2945624842=""
                                          className={` ${
                                            data?.status === "APPROVED"
                                              ? "Approved"
                                              : "Rejected"
                                          }`}
                                        >
                                          {data?.status}
                                        </span>
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            );
                          })
                        ) : (
                          <div
                            _ngcontent-ng-c3799324686=""
                            className="no-data ng-star-inserted"
                          >
                            <p _ngcontent-ng-c3799324686="">
                              No transaction yet!
                            </p>
                          </div>
                        )}
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

export default DepositStatement;
