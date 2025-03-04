import React from "react";
import { useSelector } from "react-redux";
import { useGetOrderByIdQuery } from "../../../redux/features/orders/orderApi";
import { useParams } from "react-router-dom";
import LoadingSpinner from "../../../utils/LoadingSpinner";
import { FaClock, FaTruck, FaCheckCircle, FaCog } from "react-icons/fa"; // Import the icons
import TimeLineStep from "../../../components/TimeLineStep";

const OrderDetails = () => {
  //   const { user } = useSelector((state) => state.auth);
  const { orderId } = useParams();
  const { data: order, error, isLoading } = useGetOrderByIdQuery(orderId);
  console.log(order);
  if (isLoading) return <LoadingSpinner />;
  if (error) return <div>Error: {error.message}</div>;

  const isCompleted = (status) => {
    const statuses = ["pending", "processing", "shipped", "completed"];
    return statuses.indexOf(status) < statuses.indexOf(order.status);
  };

  const isCurrent = (status) => {
    return order.status === status;
  };
  const steps = [
    {
      status: "pending",
      label: "Pending",
      description: "Your order has been created and is awaiting processing.",
      icon: <FaClock className="text-red-500" />,
    },
    {
      status: "processing",
      label: "Processing",
      description: "Your order is currently being processed.",
      icon: <FaCog className="text-yellow-800" />,
    },
    {
      status: "shipped",
      label: "Shipped",
      description: "Your order has been shipped.",
      icon: <FaTruck className="text-blue-800" />,
    },
    {
      status: "completed",
      label: "Completed",
      description: "Your order has been successfully completed.",
      icon: <FaCheckCircle className="text-green-900" />,
    },
  ];
  return (
    <section className="section__container rounded p-6">
      <h2 className="text-2xl font-semibold mb-4">Order Status : {order?.status}</h2>
      <p className="mb-4">Order Id : {order?._id}</p>

      <ol className="sm:flex items-center relative">
        {steps.map((step, index) => (
          <TimeLineStep
            key={index}
            step={step}
            order={order}
            isCompleted={isCompleted(step.status)}
            isCurrent={isCurrent(step.status)}
            isLastStep={index === steps.length - 1} // Fixed the `length` issue
            icon={step.icon}
            description={step.description}
          />
        ))}
      </ol>
    </section>
  );
};

export default OrderDetails;
