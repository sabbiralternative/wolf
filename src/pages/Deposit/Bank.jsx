import { handleCopyToClipBoard } from "../../utils/handleCopyToClipBoard";

/* eslint-disable react/no-unknown-property */
const Bank = ({ depositData }) => {
  return (
    <div
      _ngcontent-ng-c3816252360=""
      className="payment-type-details bank-transfer ng-star-inserted"
    >
      <h4 _ngcontent-ng-c3816252360="">Bank Details</h4>
      <ul _ngcontent-ng-c3816252360="">
        <li _ngcontent-ng-c3816252360="">
          <label _ngcontent-ng-c3816252360="">Account holder name</label>
          <p _ngcontent-ng-c3816252360="">
            {depositData?.accountName}{" "}
            <a
              onClick={() => handleCopyToClipBoard(depositData?.accountName)}
              _ngcontent-ng-c3816252360=""
            >
              <span
                _ngcontent-ng-c3816252360=""
                role="img"
                className="mat-icon notranslate material-icon material-icons mat-ligature-font mat-icon-no-color"
                aria-hidden="true"
                data-mat-icon-type="font"
              >
                content_copy
              </span>
            </a>
          </p>
        </li>
        <li _ngcontent-ng-c3816252360="">
          <label _ngcontent-ng-c3816252360="">Account number</label>
          <p _ngcontent-ng-c3816252360="">
            {depositData?.accountNumber}{" "}
            <a
              onClick={() => handleCopyToClipBoard(depositData?.accountNumber)}
              _ngcontent-ng-c3816252360=""
            >
              <span
                _ngcontent-ng-c3816252360=""
                role="img"
                className="mat-icon notranslate material-icon material-icons mat-ligature-font mat-icon-no-color"
                aria-hidden="true"
                data-mat-icon-type="font"
              >
                content_copy
              </span>
            </a>
          </p>
        </li>
        <li _ngcontent-ng-c3816252360="">
          <label _ngcontent-ng-c3816252360="">IFSC Code</label>
          <p _ngcontent-ng-c3816252360="">
            {depositData?.ifsc}{" "}
            <a
              onClick={() => handleCopyToClipBoard(depositData?.ifsc)}
              _ngcontent-ng-c3816252360=""
            >
              <span
                _ngcontent-ng-c3816252360=""
                role="img"
                className="mat-icon notranslate material-icon material-icons mat-ligature-font mat-icon-no-color"
                aria-hidden="true"
                data-mat-icon-type="font"
              >
                content_copy
              </span>
            </a>
          </p>
        </li>
        <li _ngcontent-ng-c3816252360="">
          <label _ngcontent-ng-c3816252360="">Bank Name</label>
          <p _ngcontent-ng-c3816252360="">
            {depositData?.bankName}
            <a
              onClick={() => handleCopyToClipBoard(depositData?.bankName)}
              _ngcontent-ng-c3816252360=""
            >
              <span
                _ngcontent-ng-c3816252360=""
                role="img"
                className="mat-icon notranslate material-icon material-icons mat-ligature-font mat-icon-no-color"
                aria-hidden="true"
                data-mat-icon-type="font"
              >
                content_copy
              </span>
            </a>
          </p>
        </li>
      </ul>
    </div>
  );
};

export default Bank;
