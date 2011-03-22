<div class="result-item">
  <div class="item-rows">
    <div class="column column-1">
      <div class="field-name"><?php print $name['prefix'] ?><?php print $name['value'] ?></div>
    </div>
    <div class="column column-2">
      <div class="field-province"><?php print $province['prefix'] ?><?php print $province['value'] ?></div>
      <div class="field-contact">
        <?php if ($contact['value']): ?>
        <?php print $contact['prefix'] ?>
        <?php print $contact['value'] ?>
        <?php endif; ?>
      </div>
    </div>
    <div class="column column-3">
      <div class="field-more arrow-right"></div>
    </div>
  </div>
  <div class="more-detail">
    <?php foreach ($details as $key => $detail): ?>
    <div class="detail-<?php print $key; ?> detail">
      <?php if ($detail['prefix']) print $detail['prefix']; ?>
      <div class="content"><?php print $detail['value']; ?></div>
      <?php if ($detail['suffix']) print $detail['suffix']; ?>
    </div>
    <?php endforeach; ?>
  </div>
</div>
