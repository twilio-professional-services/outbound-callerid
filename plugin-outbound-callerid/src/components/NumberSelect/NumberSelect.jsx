import React from "react";

import { StyledSelect, Caption } from "./NumberSelect.Styles";
import MenuItem from "@material-ui/core/MenuItem";
import * as Flex from "@twilio/flex-ui";

// It is recommended to keep components stateless and use redux for managing states
const NumberSelect = (props) => {

  return (
    <div>
      <Caption
        key="callerid-select-caption"
        className="Twilio-OutboundDialerPanel-QueueSelect-Caption"
      >
        Caller Id
      </Caption>

      <StyledSelect
        value={props.phoneNumber}
        onChange={(e) => props.updateNumber(e.target.value)}
      >
        <MenuItem key="placeholder" value="placeholder" disabled>
          Caller Id
        </MenuItem>
        {props.callerIds.map((element) => (
          <MenuItem key={element.phoneNumber} value={element.phoneNumber}>
            {element.phoneNumber} - {element.friendlyName}
          </MenuItem>
        ))}
      </StyledSelect>
    </div>
  );
};

export default NumberSelect;
