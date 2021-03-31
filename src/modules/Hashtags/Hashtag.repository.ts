/* eslint-disable @typescript-eslint/no-unused-vars */
/**
 * Created Hashtag Repository
 *
 * @author Devesh
 */

import { EntityRepository, Repository } from 'typeorm';
import { Hashtags } from '../../database/entity/hashtag';

@EntityRepository(Hashtags)
export class HashtagRepository extends Repository<Hashtags> {}
