import React, { memo } from "react";
import Background from "../Auth_Components/Background";
import Logo from "../Auth_Components/Logo";
import Header from "../Auth_Components/Header";
import Paragraph from "../Auth_Components/Paragraph";
import Button from "../Auth_Components/Button";
import { logoutUser } from "../api/auth-api";
import { Text } from "react-native";

const Dashboard = ({navigation}) => (
  <Background>
    <Logo />
    <Text style={{fontFamily:'KaushanScript-Regular',letterSpacing:1.2,marginVertical:15,fontSize:35,color:'#85C475'}}>Kronia</Text>
    <Paragraph>
      We're always here to help you anytime, Please visit again.
    </Paragraph>
    <Button mode="contained" onPress={() => logoutUser()}>
      Logout
    </Button>
    <Button mode="outlined" onPress={() => navigation.goBack()}>
      Return
    </Button>
  </Background>
);

export default memo(Dashboard);
