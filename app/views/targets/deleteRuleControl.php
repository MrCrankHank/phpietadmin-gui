<div class="row">
    <div class="col-md-12 hidden-xs">
        <button class="btn btn-danger has-spinner deleteRuleButton" type="submit" data-loading-text='<span class="glyphicon glyphicon-refresh glyphicon-spin"></span> Deleting...'>
            <span class="glyphicon glyphicon-warning-sign" aria-hidden="true"></span> Delete
        </button>

        <div class="btn-group" data-toggle="buttons">
            <label class="btn btn-default active">
                <input type="radio" name="ruleType" value="initiators" checked="checked">Initiators
            </label>
            <label class="btn btn-default">
                <input type="radio" name="ruleType" value="targets"> Targets
            </label>
        </div>
    </div>
</div>
<div class="visible-xs">
    <div class="row">
        <div class="col-xs-12">
            <button class="btn btn-danger deleteRuleButton" type="submit">
                <span class="glyphicon glyphicon-warning-sign" aria-hidden="true"></span> Delete
            </button>
        </div>
    </div>
    <div class="row top-buffer">
        <div class="col-xs-12">
            <div class="btn-group" data-toggle="buttons">
                <label class="btn btn-default active">
                    <input type="radio" name="ruleType" value="initiators" checked="checked">Initiators
                </label>
                <label class="btn btn-default">
                    <input type="radio" name="ruleType" value="targets"> Targets
                </label>
            </div>
        </div>
    </div>
</div>
<div class="top-buffer" id="deleteRuleData"></div>
<script>
    require(['common'], function () {
        require(['pages/target/deleteRuleControl', 'domReady'], function (methods, domReady) {
            domReady(function () {
                methods.loadData();
                methods.addEventHandler();
            });
        });
    });
</script>