import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PersonaService } from './persona.service';
import {PersonaSchema} from './schemas/persona.schema'
import { PersonaController } from './persona.controller';
@Module({
  imports: [MongooseModule.forFeature([{ name: 'Persona', schema: PersonaSchema }])],
  providers: [PersonaService],
  controllers: [PersonaController]
})
export class PersonaModule {}
