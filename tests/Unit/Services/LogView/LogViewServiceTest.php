<?php


namespace App\Tests\Unit\Services\LogView;


use App\Entity\LogView;
use App\Services\LogView\LogViewServiceInterface;
use App\Tests\WebTestCase;

class LogViewServiceTest extends WebTestCase
{
    public function getLogViewService(): LogViewServiceInterface
    {
        return $this->getService(LogViewServiceInterface::class);
    }

    /**
     * @return array
     */
    public function getList(): array
    {
        return $this->getLogViewService()->list();
    }

    public function getFirst(): LogView
    {
        $list = $this->getList();

        return array_shift($list);
    }

    public function testList()
    {
        $logViews = $this->getList();

        $this->assertIsArray($logViews);
        $this->assertGreaterThanOrEqual(1, count($logViews));
    }

    public function testGetColumnSetting()
    {
        $logView = $this->getFirst();

        $columnSetting = $this->getLogViewService()->getColumnSetting($logView);

        $this->assertIsArray($columnSetting);
        $this->assertEquals(9, count($columnSetting));
    }

    public function testFindByUuid()
    {
        $logView = $this->getFirst();
        $foundLogView = $this->getLogViewService()->findByUuid($logView->getUuid());

        $this->assertNotNull($foundLogView);
        $this->assertEquals($logView, $foundLogView);
    }

    public function testFindByTable()
    {
        $logView = $this->getFirst();
        $foundLogView = $this->getLogViewService()->findByTable($logView->getTable());

        $this->assertNotNull($foundLogView);
        $this->assertEquals($logView, $foundLogView);
    }

    public function testGetVisibleColumns()
    {
        $logView = $this->getFirst();
        $visibleColumns = $this->getLogViewService()->getVisibleColumns($logView);

        $this->assertIsArray($visibleColumns);
        $this->assertGreaterThanOrEqual(1, count($visibleColumns));
    }

    public function testSetVisibleColumn()
    {
        $logView = $this->getFirst();
        $columns = $this->getLogViewService()->getColumnSetting($logView);
        $totalVisible = 0;

        foreach ($columns as $index => $column) {
            $visible = true;
            $totalVisible++;

            if ($index % 2 === 0) {
                $visible = false;
                $totalVisible--;
            }

            $this->getLogViewService()->setVisibleColumn($logView, $column['name'], $visible, $index + 1);
        }

        $columns = $this->getLogViewService()->getColumnSetting($logView);
        $visibleColumns = array_filter($columns, function ($column) {
            return !empty($column['visible']);
        });

        $this->assertIsArray($visibleColumns);
        $this->assertEquals($totalVisible, count($visibleColumns));
    }
}
