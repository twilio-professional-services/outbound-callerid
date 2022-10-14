import React from "react";

import { Theme } from '@twilio-paste/core/theme';
import { Box, Label, Text, Select, Option } from "@twilio-paste/core";



// It is recommended to keep components stateless and use redux for managing states
const NumberSelect = (props) => {

  return (
    <Theme.Provider theme="flex">
    <Box width='100%'>
      <Label>
        Caller Id
      </Label>

      <Select
        value={props.phoneNumber}
        onChange={(e) => props.updateNumber(e.target.value)}
      >
        <Option key="placeholder" value="placeholder" disabled>
          Caller Id
        </Option>
        {props.callerIds.map((element) => (
          <Option key={element.phoneNumber} value={element.phoneNumber}>
            {element.phoneNumber} - {element.friendlyName}
          </Option>
        ))}
      </Select>
    </Box>
    </Theme.Provider>
  );
};

export default NumberSelect;
