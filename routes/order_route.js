const express = require('express');
const orderRoute = express.Router();
const Order = require('../models/order_model');
const OrderItemWithQuantity = require('../models/order_items_model');
const Feedback = require('../models/feedback_model');

//Create food order
orderRoute.route('/create').post((req, res) => {
  const { createDate, createTime, status, orderedBy, billValue, discount, orderType, table, handleBy, orderItems } =
    req.body;
  const order = new Order({
    createDate,
    createTime,
    status,
    orderedBy,
    billValue,
    discount,
    orderType,
    table,
    handleBy,
  });
  order
    .save()
    .then(order => {
      // after creating the order we need to save each of the items

      res.status(200).send({ status: 'sucess', order });
    })
    .catch(e => {
      res.status(400).send({ status: e });
    });
});

//View all orders
orderRoute.route('/get-all').get((req, res) => {
  Order.find()
    .populate('orderedBy', 'userName')
    .populate('orderType', 'orderType')
    .populate('table', 'tableName')
    .populate('handleBy', 'userName')
    .then(order => {
      res.status(200).send({ status: 'sucess', order });
    })
    .catch(e => {
      res.status(400).send({ status: 'faliure' });
    });
});

// get orders by id
orderRoute.route('/get-all-by-user-id').get(async (req, res) => {
  const { userId } = req.query;
  const { status: searchString } = req.query;

  const statusFilter =
    searchString && searchString.toLocaleLowerCase() == 'pending'
      ? { status: { $nin: ['Completed', 'completed'] } }
      : {};

  try {
    const order = await Order.find({ orderedBy: userId, ...statusFilter })
      .populate('orderType', 'orderType')
      .populate('table', 'tableName')
      .populate('handleBy', 'userName');

    const modifyResponse = await Promise.all(
      order.map(async orderInfomation => {
        const items = await OrderItemWithQuantity.find({
          orderID: orderInfomation._id,
        }).populate('food');

        const review = await Feedback.findOne({ orderId: orderInfomation._id });

        return {
          order: orderInfomation,
          items,
          review,
        };
      }),
    );

    res.status(200).send({ status: 'success', orders: modifyResponse });
  } catch (e) {
    res.status(400).send({ status: 'failure' });
  }
});

// orderRoute.route('/get-all-by-user-id').get((req, res) => {
//   const { userId } = req.query;
//   Order.find({ orderedBy: userId })
//     .populate('orderType', 'orderType')
//     .populate('table', 'tableName')
//     .populate('handleBy', 'userName')
//     .then(order => {
//       const modifyResponse = [];

//       order.forEach(orderInfomation => {
//         const itemList = [];
//         OrderItemWithQuantity.find({ orderID: orderInfomation._id }).then(items => {
//           console.log(items);
//           itemList.push(items);
//         });
//         modifyResponse.push({
//           orderInfomation,
//           items: itemList,
//         });
//       });

//       res.status(200).send({ status: 'sucess', modifyResponse });
//     })
//     .catch(e => {
//       console.log(e);
//       res.status(400).send({ status: 'faliure' });
//     });
// });

//update orderStatus
orderRoute.route('/update').post((req, res) => {
  const { id, status } = req.body;
  Order.findByIdAndUpdate(id, { status: status }, { new: true })
    .then(order => {
      res.status(200).send({ status: 'sucess', order });
    })
    .catch(e => {
      res.status(400).send({ status: 'faliure' });
    });
});

orderRoute.route('/create-order-with-item').post((req, res) => {
  const { orderRequestData } = req.body;
  const requestObj = JSON.parse(orderRequestData);
  const { createDate, createTime, orderBy, orderInfo, billValue } = requestObj;
  const { tableNo, orderType, itemList, pickupTime } = orderInfo;

  let newOrder = new Order();
  newOrder.orderType = orderType;
  newOrder.table = tableNo;
  newOrder.createDate = createDate;
  newOrder.createTime = createTime;
  newOrder.orderedBy = orderBy;
  newOrder.billValue = billValue;
  newOrder.status = 'pending';
  newOrder.pickUpTime = pickupTime;

  newOrder
    .save()
    .then(order => {
      itemList.forEach(async item => {
        const orderItem = new OrderItemWithQuantity();
        orderItem.orderID = order._id;
        const { food, qty } = item;
        const { foodId, price } = food;
        orderItem.food = foodId;
        orderItem.price = price;
        orderItem.quantity = qty;
        await orderItem.save();
      });
      res.status(200).send({ status: 'sucess', newOrder });
    })
    .catch(() => {
      res.status(400).send({ status: 'faliure' });
    });
});

module.exports = orderRoute;
