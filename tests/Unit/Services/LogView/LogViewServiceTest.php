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

    public function testFindByUuid(){
        $logView = $this->getFirst();
        $foundLogView = $this->getLogViewService()->findByUuid($logView->getUuid());

        $this->assertNotNull($foundLogView);
        $this->assertEquals($logView, $foundLogView);
    }
}
