<div class="workspacedirect">
    <div class="container">
        <?php if (isset($data[1])) { ?>
            <div class="row top-buffer">
                <div class='panel panel-default'>
                    <ol class='panel-heading breadcrumb'>
                        <li><a href='#'>Overview</a></li>
                        <li class="active">Targets with initiators</li>
                    </ol>
                    <div class="table-responsive">
                        <table class="table table-striped">
                            <thead>
                            <tr>
                                <?php foreach ($data[0] as $value) { ?>
                                    <th><?php echo htmlspecialchars($value); ?></th>
                                <?php } ?>
                            </tr>
                            </thead>

                            <tbody>
                            <?php foreach ($data[1] as $value) { ?>
                                <?php for ($i = 1; $i < count($value); $i++) { ?>
                                    <tr>
                                        <td><?php echo htmlspecialchars($value[0]['name']); ?></td>
                                        <td><?php echo htmlspecialchars($value[0]['tid']); ?></td>
                                        <td><?php echo htmlspecialchars($value[$i]['sid']); ?></td>
                                        <td><?php echo htmlspecialchars($value[$i]['initiator']); ?></td>
                                        <td><?php echo htmlspecialchars($value[$i]['cid']); ?></td>
                                        <td><?php echo htmlspecialchars($value[$i]['ip']); ?></td>
                                        <td><?php echo htmlspecialchars($value[$i]['state']); ?></td>
                                        <td><?php echo htmlspecialchars($value[$i]['hd']); ?></td>
                                        <td><?php echo htmlspecialchars($value[$i]['dd']); ?></td>
                                    </tr>
                                <?php } ?>
                            <?php } ?>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        <?php } ?>

        <?php if (isset($data[2])) { ?>
            <div class="row top-buffer">
                <div class='panel panel-default'>
                    <ol class='panel-heading breadcrumb'>
                        <li><a href='#'>Overview</a></li>
                        <li class="active">Targets without initiators</li>
                    </ol>
                    <div class="table-responsive">
                        <table class="table table-striped">
                            <thead>
                            <tr>
                                <th>name</th>
                                <th>tid</th>
                            </tr>
                            </thead>
                            <tbody>
                            <?php foreach ($data[2] as $value) { ?>
                                <tr>
                                    <td><?php echo htmlspecialchars($value['name']); ?></td>
                                    <td><?php echo htmlspecialchars($value['tid']); ?></td>
                                </tr>
                            <?php } ?>
                            </tbody>
                        </table>
                     </div>
                </div>
            </div>
        <?php } ?>
    </div>
</div>