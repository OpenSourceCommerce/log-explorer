<?php

namespace App\Tests\Feature\Api;

use App\Services\LogView\LogViewServiceInterface;
use App\Tests\WebTestCase;

class StreamControllerTest extends webTestCase
{
    public function testGetTable()
    {
        $client = $this->getUserClient();
        /** @var LogViewServiceInterface $logViewService */
        $logViewService = $this->getService(LogViewServiceInterface::class);
        $logView = $logViewService->getDefault();
        $client->request('GET', '/api/stream/'.$logView->getUuid().'/table');
        $this->assertApiResponseIsSuccessful($client);
    }
}
