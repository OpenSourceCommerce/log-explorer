<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20201209033832 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE dashboards (id INT AUTO_INCREMENT NOT NULL, table_id INT NOT NULL, uuid CHAR(36) NOT NULL COMMENT \'(DC2Type:uuid)\', name VARCHAR(255) NOT NULL, UNIQUE INDEX UNIQ_A83421DAD17F50A6 (uuid), INDEX IDX_A83421DAECFF285C (table_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE dashboard_summary (dashboard_id INT NOT NULL, column_id INT NOT NULL, INDEX IDX_7FCCB44EB9D04D2B (dashboard_id), INDEX IDX_7FCCB44EBE8E8ED5 (column_id), PRIMARY KEY(dashboard_id, column_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE dashboards ADD CONSTRAINT FK_A83421DAECFF285C FOREIGN KEY (table_id) REFERENCES tables (id)');
        $this->addSql('ALTER TABLE dashboard_summary ADD CONSTRAINT FK_7FCCB44EB9D04D2B FOREIGN KEY (dashboard_id) REFERENCES dashboards (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE dashboard_summary ADD CONSTRAINT FK_7FCCB44EBE8E8ED5 FOREIGN KEY (column_id) REFERENCES columns (id) ON DELETE CASCADE');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE dashboard_summary DROP FOREIGN KEY FK_7FCCB44EB9D04D2B');
        $this->addSql('DROP TABLE dashboards');
        $this->addSql('DROP TABLE dashboard_summary');
    }
}
