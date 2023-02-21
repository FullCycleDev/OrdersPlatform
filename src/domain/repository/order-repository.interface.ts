
import RepositoryInterface from "./repository-interface";
import { Order } from "sequelize";

export default interface OrderRepositoryInterface
  extends RepositoryInterface<Order> {}