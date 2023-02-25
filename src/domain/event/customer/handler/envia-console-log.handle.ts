import Customer from "../../../entity/customer";
import EventHandlerInterface from "../../@shared/event-handler.interface";
import ChangeAddressEvent from "../change-address.event";

export default class EnviaConsoleLogHandler implements EventHandlerInterface<ChangeAddressEvent> {


   handle(event:ChangeAddressEvent) :void {

        console.log("Endereço do cliente:"+event.getAddress())

    }
}