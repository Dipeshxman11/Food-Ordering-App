const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('restaurant_order_app', 'root', '0987654321', {
  host: 'localhost',
  dialect: 'mysql',
});

const Order = sequelize.define('Order', {
  menu: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  tableNo: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

sequelize.sync({ force: true }) // Set { force: true } during development to drop and recreate tables on every restart
  .then(() => {
    console.log('Database and tables created!');
  })
  .catch((error) => {
    console.error('Error creating database:', error);
  });

function saveOrder(order, callback) {
  Order.create(order)
    .then((order) => {
      callback(null, order);
    })
    .catch((error) => {
      callback(error, null);
    });
}

function getMenuItems(callback) {
  Order.findAll({
    attributes: ['menu', 'price'],
  })
    .then((menuItems) => {
      callback(null, menuItems);
    })
    .catch((error) => {
      callback(error, null);
    });
}

function getOrders(callback) {
  Order.findAll({
    attributes: ['id', 'menu', 'price', 'tableNo'],
  })
    .then((orders) => {
      callback(null, orders);
    })
    .catch((error) => {
      callback(error, null);
    });
}

function deleteOrder(orderId, callback) {
  Order.destroy({
    where: { id: orderId },
  })
    .then(() => {
      callback(null);
    })
    .catch((error) => {
      callback(error);
    });
}

module.exports = {
  saveOrder,
  getMenuItems,
  getOrders,
  deleteOrder,
};
