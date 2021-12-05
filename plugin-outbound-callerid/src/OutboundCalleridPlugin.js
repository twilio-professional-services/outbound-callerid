import React from 'react';
import { VERSION } from '@twilio/flex-ui';
import { FlexPlugin } from 'flex-plugin';

import reducers, { namespace } from './states';
import NumberSelectContainer from "./components/NumberSelect/NumberSelect.Container";
import { Actions as NumberSelectActions } from "./states/NumberSelectState";
import ConfigUtil from './utils/ConfigUtil';

const PLUGIN_NAME = 'OutboundCalleridPlugin';

export default class OutboundCalleridPlugin extends FlexPlugin {
  constructor() {
    super(PLUGIN_NAME);
  }

  /**
   * This code is run when your plugin is being started
   * Use this to modify any UI components or attach to the actions framework
   *
   * @param flex { typeof import('@twilio/flex-ui') }
   * @param manager { import('@twilio/flex-ui').Manager }
   */
  async init(flex, manager) {
    this.registerReducers(manager);

    let callerIds = [
      // {
      //   'phoneNumber': '+18044558186',
      //   'friendlyName': 'Virginia'
      // },
      // {
      //   'phoneNumber': '+16156479890',
      //   'friendlyName': 'Tennessee'
      // },
      {
        'phoneNumber': '+19382225071',
        'friendlyName': 'Alabama'
      }
    ];

    const configFile = "/config.json";
    let data = await ConfigUtil.getAsset(configFile);
    if (data) {
      console.log(PLUGIN_NAME, 'Asset data: ', data);
      callerIds = data.callerIds;
    }



    manager.store.dispatch(NumberSelectActions.setCallerIds(callerIds));
    //Set initial caller id
    manager.store.dispatch(NumberSelectActions.updateNumber(callerIds[0].phoneNumber))


    flex.OutboundDialerPanel.Content.add(
      <NumberSelectContainer key="number-selector" />,
      { sortOrder: 1 }
    );

    flex.Actions.addListener('beforeStartOutboundCall', async (payload) => {
      console.log(PLUGIN_NAME, 'BEFORE StartOutboundCall payload:', payload);

      let newCallerId = manager.store.getState()["outbound-callerid"].NumberSelect.phoneNumber;
      if (newCallerId) {
        payload.callerId = newCallerId;
      } else {
        //No caller id selected yet...
      }
      console.log(PLUGIN_NAME, 'Outbound Caller Id:', payload.callerId);
    });

  }

  /**
   * Registers the plugin reducers
   *
   * @param manager { Flex.Manager }
   */
  registerReducers(manager) {
    if (!manager.store.addReducer) {
      // eslint-disable-next-line
      console.error(`You need FlexUI > 1.9.0 to use built-in redux; you are currently on ${VERSION}`);
      return;
    }

    manager.store.addReducer(namespace, reducers);
  }
}
