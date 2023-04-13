--permet de mettre mail en unique Laurence 13-04-23
ALTER TABLE `externatic`.`consultant` 
ADD UNIQUE INDEX `mail_UNIQUE` (`mail` ASC) VISIBLE;
