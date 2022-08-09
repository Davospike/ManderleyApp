import * as React from "react";
import { View, ScrollView } from "react-native";
import { styles } from "../../../styles/About";
import TextWrapper from "../../../components/UI/Text/TextWrapper";
import Colours from "../../../../config/colours.json";

export default ConsentStoredLong = (props) => {
  const tables = [
    {
      title: "List of what data is stored",
      items: [
        {
          title: "Username",
          description:
            "You should use a personal email as your username, because we can use this email address to help you recover your password if you forget it.",
          storageLocation: "Firebase (cloud service)",
        },
        {
          title: "Password",
          description:
            "To increase the security of your account, ensure that your password is strong: a length of at least six characters; at least one symbol; at least one upper case character; at least one number; and that the password is not used for other services. Firebase does not store the password itself but stores an encrypted version of the password. If Firebase had a data breach the usernames and passwords would be protected.",
          storageLocation: "Firebase (cloud service)",
        },
        {
          title: "Database of tracked personal data",
          description:
            "The personal data that you track and the annotations that you create to reflect on these data.",
          storageLocation: "Mobile device storage",
        },
        {
          title: "App usage data",
          description:
            "We track how you use the App, for example, which features you use, in order to improve the user experience. However, all the usage data collected is anonymous.",
          storageLocation: "Amplitude (cloud service)",
        },
      ],
    },
    {
      title: "How data is stored/Who can access it",
      items: [
        {
          title: "Username (personal email)",
          description:
            "This email address is only visible to the Newcastle University research team who lead the study.",
        },
        {
          title: "Password",
          description: "Only you know your password.",
        },
        {
          title: "Database of tracked personal data",
          description:
            "This is stored on your phone. Only you and anybody else who can unlock your phone and open the App can access your personal data.",
        },
        {
          title: "App usage data",
          description:
            "These data are anonymous and can be viewed by all of the research team.",
        },
      ],
    },
  ];

  const Table = ({ table }) => {
    return (
      <View>
        <TextWrapper
          bold
          style={{
            fontSize: 20,
            marginBottom: 15,
            paddingBottom: 15,
            borderBottomWidth: 1,
            borderBottomColor: Colours.primary,
          }}
        >
          {table.title}
        </TextWrapper>
        <View />
        {table.items.map((item, index) => {
          return <TableItem item={item} key={index} />;
        })}
      </View>
    );
  };

  const TableItem = ({ item }) => {
    return (
      <View style={{ marginBottom: 20 }}>
        <TextWrapper bold style={styles.tableItemHeader}>
          {item.title}
        </TextWrapper>
        <TextWrapper reg style={styles.bodyText}>
          {item.description}
        </TextWrapper>
        <View style={{ margin: 5 }} />
        {item.storageLocation ? (
          <TextWrapper
            med
            style={{
              // color: Colours.primary,
              marginVertical: 15,
              lineHeight: 24,
              fontSize: 16,
            }}
          >
            Storage location: {item.storageLocation}
          </TextWrapper>
        ) : null}
      </View>
    );
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        {tables.map((table, index) => {
          return <Table table={table} key={index} />;
        })}
      </View>
    </ScrollView>
  );
};
