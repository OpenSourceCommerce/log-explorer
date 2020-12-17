<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20201215031506 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE logviews ADD graph_id INT NOT NULL');
        $this->addSql('ALTER TABLE logviews ADD CONSTRAINT FK_5DBB02E999134837 FOREIGN KEY (graph_id) REFERENCES graphs (id)');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_5DBB02E999134837 ON logviews (graph_id)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE logviews DROP FOREIGN KEY FK_5DBB02E999134837');
        $this->addSql('DROP INDEX UNIQ_5DBB02E999134837 ON logviews');
        $this->addSql('ALTER TABLE logviews DROP graph_id');
    }
}
