import React from 'react';
import { FaChartLine, FaUserPlus, FaShoppingCart, FaPercent } from 'react-icons/fa';
import './Dashboard.scss';
import LineChart from './LineChart';
import BarChart from './BarChart';

const Dashboard: React.FC = () => {
  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>DASHBOARD</h1>
        <div className="search">
          <input type="text" placeholder="Search" />
        </div>
      </header>

      <section className="dashboard-stats">
        <div className="stat-box">
          <div className="icon-title">
            <FaChartLine className="icon traffic-icon" />
            <h2>TRAFFIC</h2>
          </div>
          <p>350,897</p>
          <span>+3.48% Since last month</span>
        </div>
        <div className="stat-box">
          <div className="icon-title">
            <FaUserPlus className="icon new-users-icon" />
            <h2>NEW USERS</h2>
          </div>
          <p>2,356</p>
          <span>-3.48% Since last week</span>
        </div>
        <div className="stat-box">
          <div className="icon-title">
            <FaShoppingCart className="icon sales-icon" />
            <h2>SALES</h2>
          </div>
          <p>924</p>
          <span>-1.10% Since yesterday</span>
        </div>
        <div className="stat-box">
          <div className="icon-title">
            <FaPercent className="icon performance-icon" />
            <h2>PERFORMANCE</h2>
          </div>
          <p>49.65%</p>
          <span>+12% Since last month</span>
        </div>
      </section>

      <section className="dashboard-overview">
        <div className="sales-chart">
          <h3>Sales value</h3>
          <LineChart /> 
        </div>
        <div className="orders-chart">
          <h3>Total orders</h3>
          <BarChart /> 
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
