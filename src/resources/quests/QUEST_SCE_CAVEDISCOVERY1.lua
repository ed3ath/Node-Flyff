QUEST_SCE_CAVEDISCOVERY1 = {
	title = 'IDS_PROPQUEST_SCENARIO_INC_000652',
	character = 'MaDa_DarMayor',
	end_character = 'MaHa_Ryan',
	start_requirements = {
		min_level = 121,
		max_level = 129,
		job = { 'JOB_VAGRANT', 'JOB_MERCENARY', 'JOB_ACROBAT', 'JOB_ASSIST', 'JOB_MAGICIAN', 'JOB_KNIGHT', 'JOB_BLADE', 'JOB_JESTER', 'JOB_RANGER', 'JOB_RINGMASTER', 'JOB_BILLPOSTER', 'JOB_PSYCHIKEEPER', 'JOB_ELEMENTOR', 'JOB_KNIGHT_MASTER', 'JOB_BLADE_MASTER', 'JOB_JESTER_MASTER', 'JOB_RANGER_MASTER', 'JOB_RINGMASTER_MASTER', 'JOB_BILLPOSTER_MASTER', 'JOB_PSYCHIKEEPER_MASTER', 'JOB_ELEMENTOR_MASTER', 'JOB_KNIGHT_HERO', 'JOB_BLADE_HERO', 'JOB_JESTER_HERO', 'JOB_RANGER_HERO', 'JOB_RINGMASTER_HERO', 'JOB_BILLPOSTER_HERO', 'JOB_PSYCHIKEEPER_HERO', 'JOB_ELEMENTOR_HERO' },
		previous_quest = 'QUEST_SCE_QUESTIONDAILY6',
	},
	rewards = {
		gold = 0,
		exp = 492486942,
	},
	end_conditions = {
		items = {
			{ id = 'II_SYS_SYS_QUE_SPLITPIECE01', quantity = 1, sex = 'Any', remove = true },
		},
	},
	drops = {
		{
			item_id = 'II_SYS_SYS_QUE_SPLITPIECE01',
			probability = '1500000000',
			monsters = {
				'MI_SKELGRIFFIN',
				'MI_SKELLEADER',
				'MI_SKELSPAIN',
				'MI_SKELSHAMEN',
				'MI_SKELRIDER'
			}
		},
	},
	dialogs = {
		begin = {
			'IDS_PROPQUEST_SCENARIO_INC_000653',
			'IDS_PROPQUEST_SCENARIO_INC_000654',
		},
		begin_yes = {
			'IDS_PROPQUEST_SCENARIO_INC_000655',
		},
		begin_no = {
			'IDS_PROPQUEST_SCENARIO_INC_000656',
		},
		completed = {
			'IDS_PROPQUEST_SCENARIO_INC_000657',
		},
		not_finished = {
			'IDS_PROPQUEST_SCENARIO_INC_000658',
		},
	}
}
