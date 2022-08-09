import * as React from "react";
import MenuButton from "../../../components/Menu/MenuButton";
import MenuButtonContainer from "../../../components/Menu/MenuButtonContainer";
import { events, logEvent } from "../../../helpers/amplitude";

export default ConsentList = (props) => {
  const menu = [
    {
      text: "Our approach",
      route: "ConsentApproach",
      event: events.privacy.privacy_nav_consent_data_approach,
    },
    {
      text: "Your data rights",
      route: "ConsentRights",
      event: events.privacy.privacy_nav_consent_data_rights,
    },
    {
      text: "Personal data storage",
      route: "ConsentStored",
      event: events.privacy.privacy_nav_consent_data_storage,
    },
  ];

  return (
    <MenuButtonContainer>
      {menu.map((item, index) => {
        return (
          <MenuButton
            key={index}
            text={item.text}
            onPress={() => {
              logEvent(item.event);
              props.navigation.navigate(item.route, { title: item.text });
            }}
          />
        );
      })}
    </MenuButtonContainer>
  );
};
