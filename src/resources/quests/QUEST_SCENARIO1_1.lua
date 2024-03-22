QUEST_SCENARIO1_1 = {
	title = 'IDS_PROPQUEST_SCENARIO_INC_000016',
	character = 'MaFl_Noier',
	end_character = '',
	start_requirements = {
		min_level = 15,
		max_level = 129,
		job = { 'JOB_VAGRANT', 'JOB_MERCENARY', 'JOB_ACROBAT', 'JOB_ASSIST', 'JOB_MAGICIAN', 'JOB_KNIGHT', 'JOB_BLADE', 'JOB_JESTER', 'JOB_RANGER', 'JOB_RINGMASTER', 'JOB_BILLPOSTER', 'JOB_PSYCHIKEEPER', 'JOB_ELEMENTOR', 'JOB_KNIGHT_MASTER', 'JOB_BLADE_MASTER', 'JOB_JESTER_MASTER', 'JOB_RANGER_MASTER', 'JOB_RINGMASTER_MASTER', 'JOB_BILLPOSTER_MASTER', 'JOB_PSYCHIKEEPER_MASTER', 'JOB_ELEMENTOR_MASTER', 'JOB_KNIGHT_HERO', 'JOB_BLADE_HERO', 'JOB_JESTER_HERO', 'JOB_RANGER_HERO', 'JOB_RINGMASTER_HERO', 'JOB_BILLPOSTER_HERO', 'JOB_PSYCHIKEEPER_HERO', 'JOB_ELEMENTOR_HERO' },
		previous_quest = 'QUEST_SCENARIO1',
	},
	rewards = {
		gold = 0,
		exp = 0,
	},
	end_conditions = {
		items = {
			{ id = 'II_SYS_SYS_QUE_ASTROPAPER', quantity = 1, sex = 'Any', remove = false },
		},
	},
	drops = {
		{ item_id = 'II_SYS_SYS_QUE_TARINROOT', monster_id = 'MI_FEFERN3', probability = '2000000000' },
	},
	dialogs = {
		begin = {
			'IDS_PROPQUEST_SCENARIO_INC_000017',
			'IDS_PROPQUEST_SCENARIO_INC_000018',
			'IDS_PROPQUEST_SCENARIO_INC_000019',
			'IDS_PROPQUEST_SCENARIO_INC_000020',
			'IDS_PROPQUEST_SCENARIO_INC_000021',
		},
		begin_yes = {
			'IDS_PROPQUEST_SCENARIO_INC_000022',
		},
		begin_no = nil,
		completed = nil,
		not_finished = nil,
	}
}
