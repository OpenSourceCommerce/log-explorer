<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20201215064925 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE logview_columns (id INT AUTO_INCREMENT NOT NULL, logview_id INT NOT NULL, column_id INT NOT NULL, visible TINYINT(1) NOT NULL, label VARCHAR(255) DEFAULT NULL, INDEX IDX_87971B1BEFDCACE6 (logview_id), INDEX IDX_87971B1BBE8E8ED5 (column_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE logview_columns ADD CONSTRAINT FK_87971B1BEFDCACE6 FOREIGN KEY (logview_id) REFERENCES logviews (id)');
        $this->addSql('ALTER TABLE logview_columns ADD CONSTRAINT FK_87971B1BBE8E8ED5 FOREIGN KEY (column_id) REFERENCES columns (id)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('DROP TABLE logview_columns');
    }
}
