import React from 'react'
import { Stack } from 'react-bootstrap';
import "./OrderItem.css";

interface OrderItemProps {
    name: string;
    selectedAttribute: string;
    selectedDirection: string;
    changeHandler: (attribute: string, direction: string) => void;
}

const OrderItem: React.FC<OrderItemProps> = ({ name, selectedAttribute, selectedDirection, changeHandler }) => {
    return (
        <>
            <Stack className="px-2 py-0 rounded-3" direction="horizontal">
                <strong className="me-1">{name}</strong>
                <h2 className={(selectedAttribute === name && selectedDirection === "ASC" ? "text-success" : "text-primary") + " clickable"} onClick={() => changeHandler(name, "ASC")}>🠝</h2>
                <h2 className={(selectedAttribute === name && selectedDirection === "DESC" ? "text-success" : "text-primary") + " clickable"} onClick={() => changeHandler(name, "DESC")}>🠟</h2>
            </Stack>
            <div className="vr" />
        </>

    )
}

export default OrderItem