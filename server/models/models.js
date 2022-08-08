const sequelize = require('../db')
const { DataTypes } = require('sequelize')

const User = sequelize.define('user', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  email: { type: DataTypes.STRING, unique: true, allowNull: false },
  password: { type: DataTypes.STRING, allowNull: false },
  phone: { type: DataTypes.STRING, allowNull: false, unique: true },
  first_name: { type: DataTypes.STRING, allowNull: false },
  surname: { type: DataTypes.STRING, allowNull: false },
  role: { type: DataTypes.STRING, defaultValue: 'USER', allowNull: false },
})

const Excursion = sequelize.define('excursion', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title: { type: DataTypes.STRING, allowNull: false, unique: true },
  description: { type: DataTypes.TEXT, allowNull: false },
  route: { type: DataTypes.TEXT, allowNull: false },
  price: { type: DataTypes.INTEGER, allowNull: false },
  duration: { type: DataTypes.INTEGER, allowNull: false },
  start: { type: DataTypes.STRING, allowNull: false },
  end: { type: DataTypes.STRING, allowNull: false },
  img: { type: DataTypes.STRING, allowNull: false },
})

const Availability = sequelize.define('availability', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  date: { type: DataTypes.DATEONLY },
  initial_count: { type: DataTypes.INTEGER, defaultValue: 0 },
  sales_count: { type: DataTypes.INTEGER, defaultValue: 0 },
})

const Category = sequelize.define('category', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false, unique: true },
})

const Service = sequelize.define('service', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING },
})

const Place = sequelize.define('place', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, unique: true, allowNull: false },
})

const CategoryPlace = sequelize.define('category_place', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
})

const Booking = sequelize.define('booking', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  excursion_name: { type: DataTypes.STRING, allowNull: false },
  tourists_quantity: { type: DataTypes.INTEGER, allowNull: false },
  amount: { type: DataTypes.INTEGER, allowNull: false },
  status: {
    type: DataTypes.STRING,
    defaultValue: 'Подтверждено',
    allowNull: false,
  },
  date: { type: DataTypes.DATEONLY },
})

User.hasMany(Booking)
Booking.belongsTo(User)

Excursion.hasMany(Booking)
Booking.belongsTo(Excursion)

Category.hasMany(Excursion)
Excursion.belongsTo(Category)

Place.hasMany(Excursion)
Excursion.belongsTo(Place)

Excursion.hasMany(Availability, { as: 'availability' })
Availability.belongsTo(Excursion)

Excursion.hasMany(Service, { as: 'service' })
Service.belongsTo(Excursion)

Category.belongsToMany(Place, { through: CategoryPlace })
Place.belongsToMany(Category, { through: CategoryPlace })

module.exports = {
  User,
  Excursion,
  Booking,
  Service,
  Availability,
  Category,
  Place,
  CategoryPlace,
}
