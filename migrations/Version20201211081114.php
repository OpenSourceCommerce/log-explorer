<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20201211081114 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE logviews (id INT AUTO_INCREMENT NOT NULL, table_id INT NOT NULL, uuid CHAR(36) NOT NULL COMMENT \'(DC2Type:uuid)\', name VARCHAR(255) NOT NULL, UNIQUE INDEX UNIQ_5DBB02E9D17F50A6 (uuid), INDEX IDX_5DBB02E9ECFF285C (table_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE logview_summary (logview_id INT NOT NULL, column_id INT NOT NULL, INDEX IDX_E571BDCFEFDCACE6 (logview_id), INDEX IDX_E571BDCFBE8E8ED5 (column_id), PRIMARY KEY(logview_id, column_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE logviews ADD CONSTRAINT FK_5DBB02E9ECFF285C FOREIGN KEY (table_id) REFERENCES tables (id)');
        $this->addSql('ALTER TABLE logview_summary ADD CONSTRAINT FK_E571BDCFEFDCACE6 FOREIGN KEY (logview_id) REFERENCES logviews (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE logview_summary ADD CONSTRAINT FK_E571BDCFBE8E8ED5 FOREIGN KEY (column_id) REFERENCES columns (id) ON DELETE CASCADE');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE logview_summary DROP FOREIGN KEY FK_E571BDCFEFDCACE6');
        $this->addSql('DROP TABLE logviews');
        $this->addSql('DROP TABLE logview_summary');
    }
}
