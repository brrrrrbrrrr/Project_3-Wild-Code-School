
-- Kuzkina 13/04 permet de mettre mail en unique
ALTER TABLE `externatic`.`candidate` 
ADD UNIQUE INDEX `mail_UNIQUE` (`mail` ASC) VISIBLE;