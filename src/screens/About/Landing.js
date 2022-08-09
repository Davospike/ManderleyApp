import * as React from "react";
import MenuButton from "../../components/Menu/MenuButton";
import MenuButtonContainer from "../../components/Menu/MenuButtonContainer";
import { events, logEvent } from "../../helpers/amplitude";

export default AboutLanding = (props) => {
  const menu = [
    {
      text: "About us",
      route: "AboutUs",
      event: events.privacy.privacy_nav_about_us,
    },
    {
      text: "Consent & data collection",
      route: "ConsentList",
      event: events.privacy.privacy_nav_consent_data_collection_landing,
    },
    {
      text: "Cloud services",
      route: "SecurityCloud",
      event: events.privacy.privacy_nav_cloud_services,
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
