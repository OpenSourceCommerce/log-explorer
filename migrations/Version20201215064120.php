<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20201215064120 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE logviews DROP INDEX IDX_5DBB02E9ECFF285C, ADD UNIQUE INDEX UNIQ_5DBB02E9ECFF285C (table_id)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE logviews DROP INDEX UNIQ_5DBB02E9ECFF285C, ADD INDEX IDX_5DBB02E9ECFF285C (table_id)');
    }
}
