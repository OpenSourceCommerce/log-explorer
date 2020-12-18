<?php


namespace App\ServicesLogViewColumn;


use App\Entity\Column;
use App\Entity\LogView;
use App\Entity\LogViewColumn;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\Persistence\ObjectRepository;

/**
 * Class LogViewColumnService
 * @package App\ServicesLogViewColumn
 */
class LogViewColumnService implements LogViewColumnServiceInterface
{
    /**
     * @var EntityManagerInterface
     */
    private $em;

    /**
     * LogViewColumnService constructor.
     * @param EntityManagerInterface $em
     */
    public function __construct(EntityManagerInterface $em)
    {

        $this->em = $em;
    }

    /**
     * @return ObjectRepository|object
     */
    private function getRepository()
    {
        return $this->em->getRepository(LogViewColumn::class);
    }

    /**
     * @inheritDoc
     */
    public function updateColumnSetting(LogView $logView, Column $column, array $data): LogViewColumn
    {
        $logViewColumn = $this->getRepository()->findOneBy(['logView' => $logView, 'column' => $column]);

        if (empty($logViewColumn)) {
            $logViewColumn = new LogViewColumn();
            $logViewColumn->setLogView($logView);
            $logViewColumn->setColumn($column);
        }

        $logViewColumn->setVisible($data['visible']);

        return $this->save($logViewColumn);
    }

    /**
     * @param LogViewColumn $logViewColumn
     * @return LogViewColumn
     */
    private function save(LogViewColumn $logViewColumn): LogViewColumn
    {
        $this->em->persist($logViewColumn);
        $this->em->flush();

        return $logViewColumn;
    }

    /**
     * @inheritDoc
     */
    public function getColumns(LogView $logView)
    {
        // TODO: Implement getColumns() method.
    }

    /**
     * @inheritDoc
     */
    public function remove(LogView $logView, Column $column, bool $flush = true)
    {
        $logViewColumn = $this->getRepository()->findOneBy(['logView' => $logView, 'column' => $column]);
        if ($logViewColumn) {
            $this->em->remove($logViewColumn);
            if ($flush) {
                $this->em->flush();
            }
        }
    }
}
