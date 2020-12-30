<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20201230060010 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE logview_columns DROP FOREIGN KEY FK_87971B1BBE8E8ED5');
        $this->addSql('ALTER TABLE logview_summary DROP FOREIGN KEY FK_E571BDCFBE8E8ED5');
        $this->addSql('ALTER TABLE columns DROP FOREIGN KEY FK_ACCEC0B7ECFF285C');
        $this->addSql('ALTER TABLE graphs DROP FOREIGN KEY FK_946214F1ECFF285C');
        $this->addSql('ALTER TABLE logviews DROP FOREIGN KEY FK_5DBB02E9ECFF285C');
        $this->addSql('DROP TABLE columns');
        $this->addSql('DROP TABLE logview_columns');
        $this->addSql('DROP TABLE logview_summary');
        $this->addSql('DROP TABLE tables');
        $this->addSql('DROP INDEX IDX_946214F1ECFF285C ON graphs');
        $this->addSql('ALTER TABLE graphs ADD `table_name` VARCHAR(255) NOT NULL, DROP table_id');
        $this->addSql('DROP INDEX UNIQ_5DBB02E9ECFF285C ON logviews');
        $this->addSql('ALTER TABLE logviews ADD `table_name` VARCHAR(255) NOT NULL, ADD summary JSON NOT NULL, ADD logViewColumns JSON NOT NULL, DROP table_id');
        $this->addSql('ALTER TABLE user_tokens CHANGE user_id user_id INT DEFAULT NULL');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE columns (id INT AUTO_INCREMENT NOT NULL, table_id INT NOT NULL, name VARCHAR(255) CHARACTER SET utf8mb4 NOT NULL COLLATE `utf8mb4_unicode_ci`, type VARCHAR(255) CHARACTER SET utf8mb4 NOT NULL COLLATE `utf8mb4_unicode_ci`, title VARCHAR(255) CHARACTER SET utf8mb4 DEFAULT NULL COLLATE `utf8mb4_unicode_ci`, created_at DATETIME NOT NULL, updated_at DATETIME DEFAULT NULL, INDEX IDX_ACCEC0B7ECFF285C (table_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE `utf8_unicode_ci` ENGINE = InnoDB COMMENT = \'\' ');
        $this->addSql('CREATE TABLE logview_columns (id INT AUTO_INCREMENT NOT NULL, logview_id INT NOT NULL, column_id INT NOT NULL, visible TINYINT(1) NOT NULL, label VARCHAR(255) CHARACTER SET utf8mb4 DEFAULT NULL COLLATE `utf8mb4_unicode_ci`, INDEX IDX_87971B1BEFDCACE6 (logview_id), INDEX IDX_87971B1BBE8E8ED5 (column_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE `utf8_unicode_ci` ENGINE = InnoDB COMMENT = \'\' ');
        $this->addSql('CREATE TABLE logview_summary (logview_id INT NOT NULL, column_id INT NOT NULL, INDEX IDX_E571BDCFBE8E8ED5 (column_id), INDEX IDX_E571BDCFEFDCACE6 (logview_id), PRIMARY KEY(logview_id, column_id)) DEFAULT CHARACTER SET utf8 COLLATE `utf8_unicode_ci` ENGINE = InnoDB COMMENT = \'\' ');
        $this->addSql('CREATE TABLE tables (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(255) CHARACTER SET utf8mb4 NOT NULL COLLATE `utf8mb4_unicode_ci`, created_at DATETIME NOT NULL, updated_at DATETIME DEFAULT NULL, UNIQUE INDEX UNIQ_844702215E237E06 (name), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE `utf8_unicode_ci` ENGINE = InnoDB COMMENT = \'\' ');
        $this->addSql('ALTER TABLE columns ADD CONSTRAINT FK_ACCEC0B7ECFF285C FOREIGN KEY (table_id) REFERENCES tables (id)');
        $this->addSql('ALTER TABLE logview_columns ADD CONSTRAINT FK_87971B1BBE8E8ED5 FOREIGN KEY (column_id) REFERENCES columns (id)');
        $this->addSql('ALTER TABLE logview_columns ADD CONSTRAINT FK_87971B1BEFDCACE6 FOREIGN KEY (logview_id) REFERENCES logviews (id)');
        $this->addSql('ALTER TABLE logview_summary ADD CONSTRAINT FK_E571BDCFBE8E8ED5 FOREIGN KEY (column_id) REFERENCES columns (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE logview_summary ADD CONSTRAINT FK_E571BDCFEFDCACE6 FOREIGN KEY (logview_id) REFERENCES logviews (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE graphs ADD table_id INT NOT NULL, DROP `table_name`');
        $this->addSql('ALTER TABLE graphs ADD CONSTRAINT FK_946214F1ECFF285C FOREIGN KEY (table_id) REFERENCES tables (id)');
        $this->addSql('CREATE INDEX IDX_946214F1ECFF285C ON graphs (table_id)');
        $this->addSql('ALTER TABLE logviews ADD table_id INT NOT NULL, DROP `table_name`, DROP summary, DROP logViewColumns');
        $this->addSql('ALTER TABLE logviews ADD CONSTRAINT FK_5DBB02E9ECFF285C FOREIGN KEY (table_id) REFERENCES tables (id)');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_5DBB02E9ECFF285C ON logviews (table_id)');
        $this->addSql('ALTER TABLE user_tokens CHANGE user_id user_id INT NOT NULL');
    }
}
