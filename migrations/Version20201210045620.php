<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20201210045620 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE graph_lines (id INT AUTO_INCREMENT NOT NULL, graph_id INT NOT NULL, title VARCHAR(255) NOT NULL, color VARCHAR(32) NOT NULL, filter LONGTEXT DEFAULT NULL, created_at DATETIME NOT NULL, updated_at DATETIME DEFAULT NULL, INDEX IDX_CB3EA0AE99134837 (graph_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE graphs (id INT AUTO_INCREMENT NOT NULL, table_id INT NOT NULL, title VARCHAR(255) DEFAULT NULL, max_point SMALLINT DEFAULT NULL, created_at DATETIME NOT NULL, updated_at DATETIME DEFAULT NULL, INDEX IDX_946214F1ECFF285C (table_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE graph_lines ADD CONSTRAINT FK_CB3EA0AE99134837 FOREIGN KEY (graph_id) REFERENCES graphs (id)');
        $this->addSql('ALTER TABLE graphs ADD CONSTRAINT FK_946214F1ECFF285C FOREIGN KEY (table_id) REFERENCES tables (id)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE graph_lines DROP FOREIGN KEY FK_CB3EA0AE99134837');
        $this->addSql('DROP TABLE graph_lines');
        $this->addSql('DROP TABLE graphs');
    }
}
