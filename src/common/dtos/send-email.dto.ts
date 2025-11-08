import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';

export class MailOptions {
  @IsString()
  @IsNotEmpty()
  from: string;

  @IsEmail()
  @IsNotEmpty()
  to: string;

  @IsString()
  @IsNotEmpty()
  subject: string;

  @IsString()
  @IsNotEmpty()
  html: string;

  @IsString()
  @IsOptional()
  text?: string;
  // attachments?: Attachment[];
}

export class SmtpAuth {
  @IsString()
  @IsNotEmpty()
  user: string;
  @IsString()
  @IsNotEmpty()
  pass: string;
}

export class SmtpConfig {
  @IsString()
  @IsNotEmpty()
  host: string;

  @IsNotEmpty()
  @IsNumber()
  port: number;

  @IsOptional()
  @IsBoolean()
  secure: boolean;
  auth: SmtpAuth;
}

export class SendEmailDto {
  @IsObject()
  @IsNotEmpty()
  mailOptions: MailOptions;

  @IsObject()
  @IsNotEmpty()
  smtpConfig: SmtpConfig;
}
