import React, { useState, useEffect } from "react";
import { Row, Col, Typography, Button, Avatar, Spin, notification } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom"; // Updated import
import axios from 'axios';
import "./cashierdetails.css";

const { Title, Text } = Typography;

const CashierDetails = () => {
  const [cashier, setCashier] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // Use useNavigate instead of useHistory

  useEffect(() => {
    const fetchCashierDetails = async () => {
      try {
        const response = await axios.get('http://localhost:3003/employee'); // Replace with your API endpoint
        setCashier(response.data);
      } catch (error) {
        console.error('Error fetching cashier details:', error);
        notification.error({
          message: 'Error',
          description: 'Failed to load cashier details.',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchCashierDetails();
  }, []);

  const handleLogout = () => {
    // Clear access token from local storage
    localStorage.removeItem('accessToken'); // Ensure the key matches your token storage key

    // Implement any additional logout logic here (e.g., API call to invalidate session)
    
    console.log("Logging out...");
    navigate('/landing'); // Redirect to the landing page
  };

  const { name = "N/A", address = "N/A", dateOfBirth = "N/A", email = "N/A", photoUrl } = cashier;

  return (
    <div className="cashier-details-container">
      {loading ? (
        <div className="loading-spinner">
          <Spin size="large" />
        </div>
      ) : (
        <Row gutter={16}>
          <Col span={16}>
            <Title level={4}>{name}</Title>
            <Text strong>Address:</Text>
            <Text>{address}</Text>
            <br />
            <Text strong>Date of Birth:</Text>
            <Text>{dateOfBirth}</Text>
            <br />
            <Text strong>Email:</Text>
            <Text>{email}</Text>
            <br />
            <Button type="primary" danger onClick={handleLogout} style={{ marginTop: "20px" }}>
              Logout
            </Button>
          </Col>
          <Col span={8} className="cashier-avatar">
            <Avatar
              size={120}
              src={photoUrl || null}
              icon={<UserOutlined />}
            />
          </Col>
        </Row>
      )}
    </div>
  );
};

export default CashierDetails;
