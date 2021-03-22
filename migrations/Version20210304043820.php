<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20210304043820 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE dashboard_widgets (id INT AUTO_INCREMENT NOT NULL, dashboard_id INT DEFAULT NULL, widget_id INT DEFAULT NULL, x INT DEFAULT 0 NOT NULL, y INT DEFAULT 0 NOT NULL, width INT DEFAULT 0 NOT NULL, height INT DEFAULT 0 NOT NULL, minWidth INT DEFAULT 0 NOT NULL, minHeight INT DEFAULT 0 NOT NULL, fixed TINYINT(1) DEFAULT \'0\' NOT NULL, created_at DATETIME NOT NULL, updated_at DATETIME DEFAULT NULL, INDEX IDX_2CBC36ECB9D04D2B (dashboard_id), INDEX IDX_2CBC36ECFBE885E2 (widget_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE dashboards (id INT AUTO_INCREMENT NOT NULL, uuid CHAR(36) NOT NULL COMMENT \'(DC2Type:uuid)\', title VARCHAR(255) NOT NULL, query LONGTEXT DEFAULT NULL, created_at DATETIME NOT NULL, updated_at DATETIME DEFAULT NULL, UNIQUE INDEX UNIQ_A83421DAD17F50A6 (uuid), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE widgets (id INT AUTO_INCREMENT NOT NULL, title VARCHAR(255) NOT NULL, type SMALLINT NOT NULL, from_table VARCHAR(255) NOT NULL, select_column VARCHAR(255) DEFAULT NULL, order_desc TINYINT(1) DEFAULT \'1\' NOT NULL, size SMALLINT DEFAULT NULL, created_at DATETIME NOT NULL, updated_at DATETIME DEFAULT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE dashboard_widgets ADD CONSTRAINT FK_2CBC36ECB9D04D2B FOREIGN KEY (dashboard_id) REFERENCES dashboards (id)');
        $this->addSql('ALTER TABLE dashboard_widgets ADD CONSTRAINT FK_2CBC36ECFBE885E2 FOREIGN KEY (widget_id) REFERENCES widgets (id)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE dashboard_widgets DROP FOREIGN KEY FK_2CBC36ECB9D04D2B');
        $this->addSql('ALTER TABLE dashboard_widgets DROP FOREIGN KEY FK_2CBC36ECFBE885E2');
        $this->addSql('DROP TABLE dashboard_widgets');
        $this->addSql('DROP TABLE dashboards');
        $this->addSql('DROP TABLE widgets');
    }
}
