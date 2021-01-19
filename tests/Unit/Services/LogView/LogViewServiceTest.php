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
        $this->assertEquals(1, count($logViews));
    }

    public function testGetColumnSetting()
    {
        $logView = $this->getFirst();

        $columnSetting = $this->getLogViewService()->getColumnSetting($logView);

        $this->assertIsArray($columnSetting);
        $this->assertEquals(8, count($columnSetting));
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

        $visibleColumns = array_filter($visibleColumns, function ($column) {
            return !empty($column['visible']);
        });

        $this->assertIsArray($visibleColumns);
        $this->assertEquals(8, count($visibleColumns));
    }

    public function testSetVisibleColumn()
    {
        $logView = $this->getFirst();
        $this->getLogViewService()->setVisibleColumn($logView, 'url', true);
        $visibleColumns = $this->getLogViewService()->getVisibleColumns($logView);

        $this->assertIsArray($visibleColumns);
        $this->assertEquals(1, count($visibleColumns));
    }

    public function testSetVisibleColumns()
    {
        $logView = $this->getFirst();
        //Set visible only url column
        $this->getLogViewService()->setVisibleColumns($logView, false);
        $visibleColumns = $this->getLogViewService()->getVisibleColumns($logView);

        $this->assertIsArray($visibleColumns);
        $this->assertEquals(1, count($visibleColumns));

        //Set visible all columns
        $this->getLogViewService()->setVisibleColumns($logView, true);
        $visibleColumns = $this->getLogViewService()->getVisibleColumns($logView);

        $this->assertIsArray($visibleColumns);
        $this->assertEquals(8, count($visibleColumns));
    }
}
