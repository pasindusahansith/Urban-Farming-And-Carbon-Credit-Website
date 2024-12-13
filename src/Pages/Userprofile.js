import React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import ProfileComponent from '../components/ProfileComponent';
import '../Assest/css/UserProfile.css';
import '../Assest/FA 6.4.0 Pro/css/all.min.css';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

export default function Userprofile() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        bgcolor: "#90c07c",
        display: "flex",
        height: "100vh",
        padding: "5rem",
        paddingLeft: "15rem",
      }}
    >
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{ borderRight: 1, borderColor: "divider", minWidth: "200px",  bgcolor: "#0f4143", }}

      >

        <div className="tabLogo">
          <h1 className="profileGreen">
            Green
          </h1>
          <h1 className="profileCredit">
            Credit
          </h1>
        </div>
        <Tab label="Profile" {...a11yProps(0)} sx={{ color: "#ffffff", "&.Mui-selected": { color: "#90c07c" } }} />
        <Tab label="Products" {...a11yProps(1)} sx={{ color: "#ffffff", "&.Mui-selected": { color: "#90c07c" } }}/>
        <Tab label="My Cart" {...a11yProps(2)} sx={{ color: "#ffffff", "&.Mui-selected": { color: "#90c07c" } }}/>
        <Tab label="payout" {...a11yProps(3)} sx={{ color: "#ffffff", "&.Mui-selected": { color: "#90c07c" } }}/>
        <div style={{ height: "250px" }}>
        </div>

       
        <Tab label="Settings" {...a11yProps(4)} sx={{ color: "#ffffff", "&.Mui-selected": { color: "#90c07c" } }}/>
        <button className="profileLogOut">
          Log Out
        </button>

        <div style={{ height: "100px" }}>
        </div>

        <Tab label="Help" {...a11yProps(5)} sx={{ color: "#ffffff", "&.Mui-selected": { color: "#90c07c" } }}/>
      </Tabs>
      <TabPanel value={value} index={0}>
          <ProfileComponent/>
      </TabPanel>
      <TabPanel value={value} index={1}>
      <div style={{height:"91vh", backgroundColor: "#90c07c", width:"60vw"}}>
        <ProfileComponent/>
      </div>
      </TabPanel>
      <TabPanel value={value} index={2}>
        Explore the Pricing options.
      </TabPanel>
      <TabPanel value={value} index={3}>
        Get Support here.
      </TabPanel>
      <TabPanel value={value} index={4}>
        Frequently Asked Questions are answered here.
      </TabPanel>
    </Box>
  );
}
