import {
  Controller, Request, Response, OperationId, Tags, Body, Post, Security, Route,
} from 'tsoa';

import FlightService from '../../.services/flightService';
import ServiceContext from '../../.services/serviceContext';

import Context from '../context';
import CreateDTO from '../../.dto/createDTO';
import AddFlightDTO from '../../.dto/addFlightDTO';

@Tags('Flights')
@Security('jwt')
@Route('flights')
@Response('404', 'Not Found')
export class Flights extends Controller {
    @OperationId('Flights')
    @Post()
    @Context(['user'])
  public addFlight(@Request() context: ServiceContext,
                       @Body() flight: AddFlightDTO):
    Promise<CreateDTO> {
    return FlightService.addFlight(context, flight);
  }
}
