<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20210729060139 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function postUp(Schema $schema): void
    {
        $this->connection->executeStatement($this->platform->getTruncateTableSQL('logview_queries'));
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE logview_queries ADD user_id INT NOT NULL');
        $this->addSql('ALTER TABLE logview_queries ADD CONSTRAINT FK_A1A19CDEA76ED395 FOREIGN KEY (user_id) REFERENCES users (id)');
        $this->addSql('CREATE INDEX IDX_A1A19CDEA76ED395 ON logview_queries (user_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE logview_queries DROP FOREIGN KEY FK_A1A19CDEA76ED395');
        $this->addSql('DROP INDEX IDX_A1A19CDEA76ED395 ON logview_queries');
        $this->addSql('ALTER TABLE logview_queries DROP user_id');
    }
}
