QUEST_SCE_HARMONINFIND3 = {
	title = 'IDS_PROPQUEST_SCENARIO_INC_000539',
	character = 'MaHa_Ryan',
	end_character = 'MaHa_Ryan',
	start_requirements = {
		min_level = 105,
		max_level = 129,
		job = { 'JOB_VAGRANT', 'JOB_MERCENARY', 'JOB_ACROBAT', 'JOB_ASSIST', 'JOB_MAGICIAN', 'JOB_KNIGHT', 'JOB_BLADE', 'JOB_JESTER', 'JOB_RANGER', 'JOB_RINGMASTER', 'JOB_BILLPOSTER', 'JOB_PSYCHIKEEPER', 'JOB_ELEMENTOR', 'JOB_KNIGHT_MASTER', 'JOB_BLADE_MASTER', 'JOB_JESTER_MASTER', 'JOB_RANGER_MASTER', 'JOB_RINGMASTER_MASTER', 'JOB_BILLPOSTER_MASTER', 'JOB_PSYCHIKEEPER_MASTER', 'JOB_ELEMENTOR_MASTER', 'JOB_KNIGHT_HERO', 'JOB_BLADE_HERO', 'JOB_JESTER_HERO', 'JOB_RANGER_HERO', 'JOB_RINGMASTER_HERO', 'JOB_BILLPOSTER_HERO', 'JOB_PSYCHIKEEPER_HERO', 'JOB_ELEMENTOR_HERO' },
		previous_quest = 'QUEST_SCE_HARMONINFIND2',
	},
	rewards = {
		gold = 285000,
		exp = 4752893,
	},
	end_conditions = {
		items = {
			{ id = 'II_SYS_SYS_QUE_TODRINHEART', quantity = 10, sex = 'Any', remove = true },
		},
	},
	drops = {
		{
			item_id = 'II_SYS_SYS_QUE_TODRINHEART',
			probability = '1500000000',
			monsters = {
				'MI_Toadrin01',
				'MI_Toadrin02',
				'MI_Toadrin03',
				'MI_Toadrin04'
			}
		},
	},
	dialogs = {
		begin = {
			'IDS_PROPQUEST_SCENARIO_INC_000540',
		},
		begin_yes = {
			'IDS_PROPQUEST_SCENARIO_INC_000541',
		},
		begin_no = {
			'IDS_PROPQUEST_SCENARIO_INC_000542',
		},
		completed = {
			'IDS_PROPQUEST_SCENARIO_INC_000543',
		},
		not_finished = {
			'IDS_PROPQUEST_SCENARIO_INC_000544',
		},
	}
}
