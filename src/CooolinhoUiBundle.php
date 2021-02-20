<?php

namespace Cooolinho\UiBundle;

use Symfony\Component\DependencyInjection\ContainerBuilder;
use Symfony\Component\HttpKernel\Bundle\Bundle;
use Cooolinho\UiBundle\DependencyInjection\CooolinhoUiExtension;

class CooolinhoUiBundle extends Bundle
{
    /**
     * @param ContainerBuilder $container
     */
    public function build(ContainerBuilder $container)
    {
        parent::build($container);
    }

    /**
     * @return CooolinhoUiExtension
     */
    public function getContainerExtension(): CooolinhoUiExtension
    {
        return new CooolinhoUiExtension();
    }
}
