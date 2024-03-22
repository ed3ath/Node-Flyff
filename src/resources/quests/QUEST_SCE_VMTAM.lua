QUEST_SCE_VMTAM = {
	title = 'IDS_PROPQUEST_SCENARIO_INC_000383',
	character = 'MaSa_Rovanett',
	end_character = 'MaSa_Rovanett',
	start_requirements = {
		min_level = 20,
		max_level = 129,
		job = { 'JOB_VAGRANT', 'JOB_MERCENARY', 'JOB_ACROBAT', 'JOB_ASSIST', 'JOB_MAGICIAN', 'JOB_KNIGHT', 'JOB_BLADE', 'JOB_JESTER', 'JOB_RANGER', 'JOB_RINGMASTER', 'JOB_BILLPOSTER', 'JOB_PSYCHIKEEPER', 'JOB_ELEMENTOR', 'JOB_KNIGHT_MASTER', 'JOB_BLADE_MASTER', 'JOB_JESTER_MASTER', 'JOB_RANGER_MASTER', 'JOB_RINGMASTER_MASTER', 'JOB_BILLPOSTER_MASTER', 'JOB_PSYCHIKEEPER_MASTER', 'JOB_ELEMENTOR_MASTER', 'JOB_KNIGHT_HERO', 'JOB_BLADE_HERO', 'JOB_JESTER_HERO', 'JOB_RANGER_HERO', 'JOB_RINGMASTER_HERO', 'JOB_BILLPOSTER_HERO', 'JOB_PSYCHIKEEPER_HERO', 'JOB_ELEMENTOR_HERO' },
		previous_quest = 'QUEST_SCE_SHADEHILL',
	},
	rewards = {
		gold = 0,
		exp = 0,
	},
	end_conditions = {
		items = {
			{ id = 'II_SYS_SYS_QUE_UNKMARK', quantity = 1, sex = 'Any', remove = true },
			{ id = 'II_SYS_SYS_QUE_UNKCLOTH', quantity = 1, sex = 'Any', remove = true },
		},
	},
	dialogs = {
		begin = {
			'IDS_PROPQUEST_SCENARIO_INC_000384',
			'IDS_PROPQUEST_SCENARIO_INC_000385',
			'IDS_PROPQUEST_SCENARIO_INC_000386',
			'IDS_PROPQUEST_SCENARIO_INC_000387',
		},
		begin_yes = {
			'IDS_PROPQUEST_SCENARIO_INC_000388',
		},
		begin_no = {
			'IDS_PROPQUEST_SCENARIO_INC_000389',
		},
		completed = {
			'IDS_PROPQUEST_SCENARIO_INC_000390',
		},
		not_finished = {
			'IDS_PROPQUEST_SCENARIO_INC_000391',
		},
	}
}
