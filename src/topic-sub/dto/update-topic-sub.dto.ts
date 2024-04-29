import { PartialType } from '@nestjs/swagger';
import { CreateTopicSubDto } from './create-topic-sub.dto';

export class UpdateTopicSubDto extends PartialType(CreateTopicSubDto) {}
