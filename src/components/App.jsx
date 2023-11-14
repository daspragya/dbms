import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./Signup";
import Login from "./Login";
import DonarNavbar from "./Donor/DonarNavbar";
import DashboardDonor from "./Donor/Dashboard";
import ListAllDonations from "./Donor/ListAll";
import MakeNewDonation from "./Donor/NewDonation";
import ItemDetails from "./Donor/ItemDetails";
import UpdateProfile from "./Donor/UpdateProfile";

import NavBarOrg from "./Organization/NavbarOrganization";
import DashboardOrganization from "./Organization/Dashboard";
import ListAllDonationsOrg from "./Organization/ListAllDonations";
import ItemDetailsOrg from "./Organization/ItemDetail";

import NavBarWarehouse from "./Warehouse/NavbarWarehouse";
import DashboardWarehouse from "./Warehouse/Dashboard";
import ListAllDonationsWarehouse from "./Warehouse/ListAllDonations";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/donar" element={<DashboardDonor />} />
          <Route path="/navbardonar" element={<DonarNavbar />} />
          <Route path="/listalldonations" element={<ListAllDonations />} />
          <Route path="/itemdetail/:id" element={<ItemDetails />} />
          <Route path="/makenewdonation" element={<MakeNewDonation />} />
          <Route path="/profile" element={<UpdateProfile />} />

          <Route path="/org" element={<DashboardOrganization />} />
          <Route path="/navbardorg" element={<NavBarOrg />} />
          <Route path="/itemdetailorg/:id" element={<ItemDetailsOrg />} />
          <Route
            path="/listalldonationsorg"
            element={<ListAllDonationsOrg />}
          />

          <Route path="/warehouse" element={<DashboardWarehouse />} />
          <Route path="/navbarwarehouse" element={<NavBarWarehouse />} />
          <Route
            path="/listalldonationsware"
            element={<ListAllDonationsWarehouse />}
          />
        </Routes>
      </Router>
    </>
  );
};

export default App;
