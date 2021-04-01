/* eslint-disable @typescript-eslint/no-unused-vars */
/**
 * Created Channels Repository
 *
 * @author Devesh
 */

import { EntityRepository, Repository } from 'typeorm';
import { Channels } from '../../database/entity/channels';

@EntityRepository(Channels)
export class ChannelsRepository extends Repository<Channels> {}
