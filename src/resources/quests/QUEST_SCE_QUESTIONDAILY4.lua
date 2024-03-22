QUEST_SCE_QUESTIONDAILY4 = {
	title = 'IDS_PROPQUEST_SCENARIO_INC_000634',
	character = 'MaHa_Vespu',
	end_character = 'MaHa_Vespu',
	start_requirements = {
		min_level = 121,
		max_level = 129,
		job = { 'JOB_VAGRANT', 'JOB_MERCENARY', 'JOB_ACROBAT', 'JOB_ASSIST', 'JOB_MAGICIAN', 'JOB_KNIGHT', 'JOB_BLADE', 'JOB_JESTER', 'JOB_RANGER', 'JOB_RINGMASTER', 'JOB_BILLPOSTER', 'JOB_PSYCHIKEEPER', 'JOB_ELEMENTOR', 'JOB_KNIGHT_MASTER', 'JOB_BLADE_MASTER', 'JOB_JESTER_MASTER', 'JOB_RANGER_MASTER', 'JOB_RINGMASTER_MASTER', 'JOB_BILLPOSTER_MASTER', 'JOB_PSYCHIKEEPER_MASTER', 'JOB_ELEMENTOR_MASTER', 'JOB_KNIGHT_HERO', 'JOB_BLADE_HERO', 'JOB_JESTER_HERO', 'JOB_RANGER_HERO', 'JOB_RINGMASTER_HERO', 'JOB_BILLPOSTER_HERO', 'JOB_PSYCHIKEEPER_HERO', 'JOB_ELEMENTOR_HERO' },
		previous_quest = 'QUEST_SCE_QUESTIONDAILY3',
	},
	rewards = {
		gold = 0,
		exp = 984973884,
	},
	end_conditions = {
		items = {
			{ id = 'II_SYS_SYS_QUE_FIGHTERBOX', quantity = 1, sex = 'Any', remove = true },
		},
	},
	drops = {
		{ item_id = 'II_SYS_SYS_QUE_FIGHTERBOX', monster_id = 'MI_SKELFIGHTER', probability = '1500000000' },
	},
	dialogs = {
		begin = {
			'IDS_PROPQUEST_SCENARIO_INC_000635',
			'IDS_PROPQUEST_SCENARIO_INC_000636',
		},
		begin_yes = {
			'IDS_PROPQUEST_SCENARIO_INC_000637',
		},
		begin_no = {
			'IDS_PROPQUEST_SCENARIO_INC_000638',
		},
		completed = {
			'IDS_PROPQUEST_SCENARIO_INC_000639',
		},
		not_finished = {
			'IDS_PROPQUEST_SCENARIO_INC_000640',
		},
	}
}
