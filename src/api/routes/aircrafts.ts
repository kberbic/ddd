import {
  Controller, Request, Response, OperationId, Tags, Get, Body, Post, Security, Route,
} from 'tsoa';

import AircraftService from '../../.services/aircraftService';
import ServiceContext from '../../.services/serviceContext';

import Context from '../context';
import CreateDTO from '../../.dto/createDTO';
import AddAircraftDTO from '../../.dto/addAircraftDTO';

@Tags('Aircrafts')
@Security('jwt')
@Route('aircrafts')
@Response('404', 'Not Found')
export class Aircrafts extends Controller {
    @OperationId('Aircrafts')
    @Post()
    @Context(['user'])
  public addAircraft(@Request() context: ServiceContext,
                     @Body() aircraft: AddAircraftDTO):
    Promise<CreateDTO> {
    return AircraftService.addAircraft(context, aircraft);
  }

    @OperationId('Aircrafts')
    @Get()
    @Context(['user'])
    public getAll(@Request() context: ServiceContext): Promise<CreateDTO> {
      return AircraftService.getAll(context);
    }
}
